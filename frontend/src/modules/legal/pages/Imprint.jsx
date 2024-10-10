import React from "react";

function Imprint() {
  return (
    <div className="container pb-4" style={{ maxWidth: 1050 }}>
      <div className="d-flex flex-column mb-5">
        <a
          href="/"
          className="text-decoration-none h2 bold"
          style={{ width: "fit-content" }}
        >
          Dataset Search Engine
        </a>
      </div>
      <div className="d-flex flex-column mb-5">
        <h2 className="d-flex justify-content-center">Imprint</h2>
        <p>
          <strong>Name and legal form:</strong> beebucket GmbH
        </p>
        <p>
          <strong>Address:</strong> Neunkirchenweg 22, 89077 Ulm, Germany
        </p>
        <p>
          <strong>Phone number:</strong> +49-731-7903 8050
        </p>
        <p>
          <strong>Email address:</strong>{" "}
          <a href="mailto:hello@beebucket.ai">hello@beebucket.ai</a>
        </p>
        <p>
          <strong>Managing Director:</strong> Florian Mauer-Endler
        </p>
        <p>
          <strong>Commercial register entry:</strong> AG Ulm, HRB 741249
        </p>
        <p>
          <strong>VAT-ID:</strong> DE337986141
        </p>
        <p>
          <strong>
            Responsible for the content according to § 18 para. 2 MStV:
          </strong>{" "}
          Florian Mauer-Endler
        </p>
      </div>
    </div>
  );
}

export default Imprint;
