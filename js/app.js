(() => {
  "use strict";

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];

  /* =========================
     TAB NAVIGATION
  ========================= */

  $$(".nav-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const tab = button.dataset.tab;

      $$(".nav-btn").forEach((item) => {
        item.classList.toggle("active", item === button);
      });

      $$(".tab-pane").forEach((pane) => {
        pane.classList.toggle(
          "active",
          pane.id === `tab-${tab}`
        );
      });

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  });

  /* =========================
     LIVE CLOCK
  ========================= */

  const updateClock = () => {
    const now = new Date();

    $("#live-clock").textContent =
      now.toLocaleTimeString("id-ID", {
        hour12: false
      });

    $("#live-date").textContent =
      now.toLocaleDateString("id-ID", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric"
      }).toUpperCase();
  };

  updateClock();
  setInterval(updateClock, 1000);

  /* =========================
     TYPEWRITER
  ========================= */

  const phrases = [
    "SECURITY-FIRST ENGINEER",
    "WEB SYSTEM ARCHITECT",
    "CYBER SECURITY ENTHUSIAST"
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const typewriter = () => {
    const element = $("#typewriter");

    if (!element) return;

    const phrase = phrases[phraseIndex];

    if (deleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    element.textContent = phrase.slice(
      0,
      Math.max(0, charIndex)
    );

    if (!deleting && charIndex >= phrase.length) {
      deleting = true;
      setTimeout(typewriter, 1200);
      return;
    }

    if (deleting && charIndex <= 0) {
      deleting = false;
      phraseIndex =
        (phraseIndex + 1) % phrases.length;
      charIndex = 0;
    }

    setTimeout(
      typewriter,
      deleting ? 38 : 72
    );
  };

  typewriter();

  /* =========================
     SAFE DEMO TELEMETRY
  ========================= */

  const randomOctet = () =>
    Math.floor(Math.random() * 254) + 1;

  const mockIp = $("#mock-ip");

  if (mockIp) {
    mockIp.textContent =
      `10.${randomOctet()}.${randomOctet()}.${randomOctet()}`;
  }

  /* =========================
     WEATHER
  ========================= */

  const weatherElement = $("#weather");

  if (weatherElement) {
    fetch(
      "https://api.open-meteo.com/v1/forecast" +
      "?latitude=-6.2088" +
      "&longitude=106.8456" +
      "&current=temperature_2m" +
      "&timezone=Asia%2FJakarta"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Weather request failed");
        }

        return response.json();
      })
      .then((data) => {
        const temperature =
          Math.round(
            data.current.temperature_2m
          );

        weatherElement.textContent =
          `JKT // ${temperature}°C`;
      })
      .catch(() => {
        weatherElement.textContent =
          "JKT // ONLINE";
      });
  }

  /* =========================
     TERMINAL
  ========================= */

  const terminalOutput = $("#terminal-output");

  const terminalLines = [
    "[OK] boot sequence verified",
    "[OK] encrypted transport ready",
    "[SCAN] application surface mapped",
    "[SCAN] telemetry channel nominal",
    "[PASS] security baseline stable",
    "[LIVE] RZ//SEC monitoring active"
  ];

  let terminalIndex = 0;

  const printTerminalLine = () => {
    if (!terminalOutput) return;

    if (terminalIndex >= terminalLines.length) {
      return;
    }

    terminalOutput.textContent +=
      `${terminalLines[terminalIndex]}\n`;

    terminalIndex++;

    terminalOutput.scrollTop =
      terminalOutput.scrollHeight;

    setTimeout(
      printTerminalLine,
      420
    );
  };

  printTerminalLine();

  /* =========================
     CONTACT FORM
  ========================= */

  const contactForm = $("#contact-form");

  if (contactForm) {
    contactForm.addEventListener(
      "submit",
      async (event) => {
        event.preventDefault();

        const status =
          $("#form-status");

        const button =
          contactForm.querySelector("button");

        const payload =
          Object.fromEntries(
            new FormData(contactForm).entries()
          );

        button.disabled = true;

        status.textContent =
          "TRANSMITTING...";

        try {
          const response = await fetch(
            "/api/contact",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json"
              },
              body: JSON.stringify(payload)
            }
          );

          const data =
            await response
              .json()
              .catch(() => ({}));

          if (!response.ok) {
            throw new Error(
              data.error ||
              "Transmission failed"
            );
          }

          contactForm.reset();

          status.textContent =
            "MESSAGE ACCEPTED // SECURE CHANNEL";

        } catch (error) {

          console.error(error);

          status.textContent =
            "CHANNEL UNAVAILABLE // PLEASE USE WHATSAPP OR EMAIL";

        } finally {
          button.disabled = false;
        }
      }
    );
  }

  /* =========================
     MATRIX + SPIDER NETWORK
  ========================= */

  const canvas =
    $("#matrix-spider-canvas");

  if (!canvas) return;

  const ctx =
    canvas.getContext("2d");

  if (!ctx) return;

  let width = 0;
  let height = 0;

  let nodes = [];

  const pointer = {
    x: -9999,
    y: -9999
  };

  const resizeCanvas = () => {

    const dpr =
      Math.min(
        window.devicePixelRatio || 1,
        2
      );

    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width =
      width * dpr;

    canvas.height =
      height * dpr;

    canvas.style.width =
      `${width}px`;

    canvas.style.height =
      `${height}px`;

    ctx.setTransform(
      dpr,
      0,
      0,
      dpr,
      0,
      0
    );

    const count =
      Math.min(
        85,
        Math.max(
          35,
          Math.floor(
            width * height / 12000
          )
        )
      );

    nodes =
      Array.from(
        { length: count },
        () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          radius: Math.random() * 1.2 + 0.3
        })
      );
  };

  window.addEventListener(
    "resize",
    resizeCanvas,
    { passive: true }
  );

  window.addEventListener(
    "pointermove",
    (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    },
    { passive: true }
  );

  window.addEventListener(
    "pointerleave",
    () => {
      pointer.x = -9999;
      pointer.y = -9999;
    },
    { passive: true }
  );

  resizeCanvas();

  const animateNetwork = () => {

    ctx.clearRect(
      0,
      0,
      width,
      height
    );

    for (const node of nodes) {

      node.x += node.vx;
      node.y += node.vy;

      if (
        node.x < 0 ||
        node.x > width
      ) {
        node.vx *= -1;
      }

      if (
        node.y < 0 ||
        node.y > height
      ) {
        node.vy *= -1;
      }

      ctx.beginPath();

      ctx.arc(
        node.x,
        node.y,
        node.radius,
        0,
        Math.PI * 2
      );

      ctx.fillStyle =
        "rgba(34,211,238,.45)";

      ctx.fill();
    }

    for (
      let i = 0;
      i < nodes.length;
      i++
    ) {

      const current =
        nodes[i];

      for (
        let j = i + 1;
        j < nodes.length;
        j++
      ) {

        const other =
          nodes[j];

        const dx =
          current.x - other.x;

        const dy =
          current.y - other.y;

        const distance =
          Math.hypot(dx, dy);

        if (distance < 105) {

          ctx.beginPath();

          ctx.moveTo(
            current.x,
            current.y
          );

          ctx.lineTo(
            other.x,
            other.y
          );

          ctx.strokeStyle =
            `rgba(34,211,238,${
              (1 - distance / 105) * 0.13
            })`;

          ctx.lineWidth = 1;

          ctx.stroke();
        }
      }

      const pointerDistance =
        Math.hypot(
          current.x - pointer.x,
          current.y - pointer.y
        );

      if (pointerDistance < 150) {

        ctx.beginPath();

        ctx.moveTo(
          current.x,
          current.y
        );

        ctx.lineTo(
          pointer.x,
          pointer.y
        );

        ctx.strokeStyle =
          `rgba(230,36,41,${
            (1 - pointerDistance / 150) * 0.35
          })`;

        ctx.stroke();
      }
    }

    requestAnimationFrame(
      animateNetwork
    );
  };

  animateNetwork();

})();