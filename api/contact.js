export default async function handler(req, res) {

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");

    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  const {
    name,
    email,
    message
  } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({
      error: "Missing fields"
    });
  }

  const supabaseUrl =
    process.env.SUPABASE_URL;

  const serviceKey =
    process.env.SUPABASE_SERVICE_ROLE;

  if (
    !supabaseUrl ||
    !serviceKey
  ) {
    return res.status(500).json({
      error:
        "Server environment is not configured"
    });
  }

  try {

    const response =
      await fetch(
        `${supabaseUrl.replace(/\/$/, "")}/rest/v1/portfolio_messages`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            "apikey":
              serviceKey,

            "Authorization":
              `Bearer ${serviceKey}`,

            "Prefer":
              "return=minimal"
          },

          body: JSON.stringify({
            name:
              String(name)
                .trim()
                .slice(0, 80),

            email:
              String(email)
                .trim()
                .slice(0, 160),

            subject:
              "Portfolio Contact",

            message:
              String(message)
                .trim()
                .slice(0, 2000)
          })
        }
      );

    if (!response.ok) {

      const detail =
        await response.text();

      console.error(
        "Supabase:",
        detail
      );

      return res.status(502).json({
        error:
          "Database request failed"
      });
    }

    return res.status(200).json({
      success: true
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error:
        "Internal server error"
    });
  }
}