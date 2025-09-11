import dns from "dns/promises";
import net from "net";

const isValidSyntax = (email) => {
  const emailRegex =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
  return emailRegex.test(email);
};

const findMxRecords = async (domain) => {
  try {
    const mx = await dns.resolveMx(domain);
    return mx.sort((a, b) => a.priority - b.priority);
  } catch (error) {
    try {
      const ipArray = await dns.resolve(domain);
      return ipArray.map((ip) => ({ exchange: ip, priority: 0 }));
    } catch (error) {
      return [];
    }
  }
};

const smtpVerifyEmail = async (email, mxRecords, timeout = 10000) => {
  const domain = email.split("@")[1];
  const fromEmail = "akarshit0307@outlook.com";

  for (const mx of mxRecords.slice(0, 3)) {
    try {
      const result = await checkSMTPServer(
        mx.exchange,
        fromEmail,
        email,
        timeout,
      );
      if (result.checked) {
        return result;
      }
    } catch (error) {
      console.log(`Failed to check ${mx.exchange}:`, error.message);
      continue;
    }
  }

  return {
    valid: false,
    reason: "smtp_check_failed",
    message: "Could not verify email with any mail server",
    checked: false,
  };
};

const isDisposableEmail = async (domain) => {
  const disposableDomains = [
    "10minutemail.com",
    "guerrillamail.com",
    "mailinator.com",
    "tempmail.org",
    "yopmail.com",
    "33mail.com",
    "throwaway.email",
  ];

  return disposableDomains.includes(domain.toLowerCase());
};

const checkSMTPServer = (server, fromEmail, toEmail, timeout) => {
  return new Promise((resolve, reject) => {
    const socket = new net.Socket();
    let response = "";
    let step = 0;

    const commands = [
      `HELO ${server}`,
      `MAIL FROM:<${fromEmail}>`,
      `RCPT TO:<${toEmail}>`,
      "QUIT",
    ];

    const timeoutId = setTimeout(() => {
      socket.destroy();
      reject(new Error("Connection timeout"));
    }, timeout);

    socket.connect(25, server, () => {
      console.log(`Connected to ${server}`);
    });

    socket.on("data", (data) => {
      response += data.toString();

      if (response.includes("\n")) {
        const lines = response.split("\n");
        const lastLine = lines[lines.length - 2] || lines[lines.length - 1];
        const code = parseInt(lastLine.substring(0, 3));

        console.log(`${server} response:`, lastLine.trim());

        if (step === 0 && code === 220) {
          socket.write(commands[0] + "\r\n");
          step++;
        } else if (step === 1 && code === 250) {
          socket.write(commands[1] + "\r\n");
          step++;
        } else if (step === 2 && code === 250) {
          socket.write(commands[2] + "\r\n");
          step++;
        } else if (step === 3) {
          clearTimeout(timeoutId);
          socket.destroy();

          if (code === 250) {
            resolve({
              valid: true,
              reason: "accepted",
              message: "Email exists and accepts mail",
              checked: true,
              server: server,
              smtpCode: code,
            });
          } else if (code === 550 || code === 551 || code === 553) {
            resolve({
              valid: false,
              reason: "user_not_found",
              message: "Email address does not exist",
              checked: true,
              server: server,
              smtpCode: code,
            });
          } else if (code === 450 || code === 451 || code === 452) {
            resolve({
              valid: false,
              reason: "temporary_failure",
              message: "Temporary failure, try again later",
              checked: true,
              server: server,
              smtpCode: code,
            });
          } else {
            resolve({
              valid: false,
              reason: "unknown_error",
              message: `Server returned code ${code}`,
              checked: true,
              server: server,
              smtpCode: code,
            });
          }
        } else {
          clearTimeout(timeoutId);
          socket.destroy();
          reject(
            new Error(
              `Unexpected response at step ${step}: ${lastLine.trim()}`,
            ),
          );
        }

        response = "";
      }
    });

    socket.on("error", (error) => {
      clearTimeout(timeoutId);
      reject(error);
    });

    socket.on("close", () => {
      clearTimeout(timeoutId);
    });
  });
};

export const validateEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({
      status: "invalid",
      reason: "email_not_given",
      message: "Email is required",
    });
  }

  if (!isValidSyntax(email)) {
    return res.json({
      status: "invalid",
      reason: "syntax",
      message: "Please enter correct email format",
    });
  }

  const domain = email.split("@")[1].toLowerCase();

  const testDomains = ["example.com", "test.com", "localhost"];
  if (testDomains.includes(domain)) {
    return res.json({
      status: "invalid",
      reason: "test_domain",
      message: "Test domains are not valid",
    });
  }

  const mx = await findMxRecords(domain);

  if (await isDisposableEmail(domain)) {
    return res.json({
      status: "invalid",
      reason: "disposable_email",
      message: "Disposable email addresses are not allowed",
    });
  }

  if (!mx || mx.length === 0) {
    return res.json({
      status: "invalid",
      reason: "no_mail_server",
      message: "No mail server found for this domain",
    });
  }

  try {
    const smtpResult = await smtpVerifyEmail(email, mx);

    if (smtpResult.valid) {
      return res.json({
        status: "valid",
        message: "Email exists and can receive mail",
        details: smtpResult,
        domain,
        mx,
      });
    } else if (smtpResult.checked) {
      return res.json({
        status: "invalid",
        reason: smtpResult.reason,
        message: smtpResult.message,
        details: smtpResult,
        domain,
        mx,
      });
    } else {
      return res.json({
        status: "unknown",
        reason: "verification_failed",
        message:
          "Could not verify email - mail servers may be blocking verification",
        details: smtpResult,
        domain,
        mx,
      });
    }
  } catch (error) {
    console.error("SMTP verification error:", error);
    return res.json({
      status: "error",
      reason: "verification_error",
      message: "Error occurred during email verification",
      error: error.message,
      domain,
      mx,
    });
  }
};
