// =========================================================
// CLIPCRAFT - HELP & SUPPORT
// Rushikesh
// Frontend UI Module
// =========================================================

export function renderHelpSupport() {

  return `

    <section class="help-support-page">

      <div class="help-support-header">

        <span class="help-support-eyebrow">
          SUPPORT CENTER
        </span>

        <h1>
          Help & Support
        </h1>

        <p>
          Find answers, learn how ClipCraft works,
          and get help when you need it.
        </p>

      </div>


      <!-- SEARCH -->
      <div class="help-support-search">

        <input
          type="search"
          class="help-search-input"
          placeholder="Search for help..."
          aria-label="Search for help"
        />

      </div>


      <div class="help-support-content">


        <!-- FAQ -->
        <div class="help-support-card help-faq-card">

          <h2>
            Frequently Asked Questions
          </h2>

          <p>
            Helpful answers for common ClipCraft questions.
          </p>


          <div class="help-faq-list">

            <div class="help-faq-item">

              <button
                class="help-faq-question"
                type="button"
              >
                How do I create a new project?

                <span aria-hidden="true">+</span>
              </button>


              <div class="help-faq-answer">

                Click the New Project button from the dashboard,
                enter your project name, and continue to upload your video.

              </div>

            </div>


            <div class="help-faq-item">

              <button
                class="help-faq-question"
                type="button"
              >
                How do I upload a video?

                <span aria-hidden="true">+</span>
              </button>


              <div class="help-faq-answer">

                Open a project, choose the video upload option,
                select a video file, and continue to the editor.

              </div>

            </div>


            <div class="help-faq-item">

              <button
                class="help-faq-question"
                type="button"
              >
                How do I open the video editor?

                <span aria-hidden="true">+</span>
              </button>


              <div class="help-faq-answer">

                After selecting a valid video file,
                click Continue to Editor to open the editing workspace.

              </div>

            </div>

          </div>

        </div>


        <!-- GETTING STARTED -->
        <div class="help-support-card help-getting-started-card">

          <h2>
            Getting Started
          </h2>

          <p>
            Follow these simple steps to start working with ClipCraft.
          </p>


          <div class="help-started-steps">

            <div class="help-started-step">

              <span class="help-step-number">
                1
              </span>

              <div>

                <h3>
                  Create a Project
                </h3>

                <p>
                  Start a new project from the ClipCraft dashboard.
                </p>

              </div>

            </div>


            <div class="help-started-step">

              <span class="help-step-number">
                2
              </span>

              <div>

                <h3>
                  Upload Your Video
                </h3>

                <p>
                  Select your video file and upload it to your project.
                </p>

              </div>

            </div>


            <div class="help-started-step">

              <span class="help-step-number">
                3
              </span>

              <div>

                <h3>
                  Open the Editor
                </h3>

                <p>
                  Continue to the editor and start working on your video.
                </p>

              </div>

            </div>


            <div class="help-started-step">

              <span class="help-step-number">
                4
              </span>

              <div>

                <h3>
                  Edit Your Video
                </h3>

                <p>
                  Use the editing workspace to make changes to your video.
                </p>

              </div>

            </div>


            <div class="help-started-step">

              <span class="help-step-number">
                5
              </span>

              <div>

                <h3>
                  Export Your Work
                </h3>

                <p>
                  Complete your editing and continue to the output stage.
                </p>

              </div>

            </div>

          </div>

        </div>


        <!-- CONTACT SUPPORT -->
        <div
          class="help-support-card help-contact-card"
          id="contactSupportCard"
        >

          <h2>
            Contact Support
          </h2>

          <p>
            Need more help? Send us your question or problem.
          </p>


          <button
            type="button"
            class="help-contact-button"
            id="openSupportForm"
          >
            Contact Support
          </button>

        </div>


      </div>


      <!-- SUPPORT FORM -->
      <div
        class="help-support-form-wrapper"
        id="supportFormWrapper"
        hidden
      >

        <div class="help-support-form-card">

          <div class="help-support-form-header">

            <h2>
              Contact Support
            </h2>

            <p>
              Tell us what you need help with.
            </p>

          </div>


          <form id="supportForm">


            <div class="help-form-field">

              <label for="supportName">
                Name
              </label>

              <input
                type="text"
                id="supportName"
                name="name"
                placeholder="Enter your name"
                required
              />

              <p
                class="help-field-error"
                id="supportNameError"
                hidden
              ></p>

            </div>


            <div class="help-form-field">

              <label for="supportEmail">
                Email
              </label>

              <input
                type="email"
                id="supportEmail"
                name="email"
                placeholder="Enter your email"
                required
              />

              <p
                class="help-field-error"
                id="supportEmailError"
                hidden
              ></p>

            </div>


            <div class="help-form-field">

              <label for="supportMessage">
                How can we help?
              </label>

              <textarea
                id="supportMessage"
                name="message"
                rows="5"
                maxlength="500"
                placeholder="Describe your problem..."
                required
              ></textarea>

              <div class="help-message-counter">
                <span id="supportMessageCount">0</span>/500
              </div>

              <p
                class="help-field-error"
                id="supportMessageError"
                hidden
              ></p>

            </div>


            <div class="help-support-form-actions">

              <button
                type="button"
                class="help-cancel-button"
                id="closeSupportForm"
              >
                Cancel
              </button>

              <button
                type="submit"
                class="help-submit-button"
              >
                Send Request
              </button>

            </div>

          </form>


          <!-- SUCCESS MESSAGE -->
          <div
            class="help-success-message"
            id="helpSuccessMessage"
            role="status"
            aria-live="polite"
            hidden
          >

            <strong>
              Request submitted successfully.
            </strong>

            <p>
              Thank you for contacting ClipCraft Support.
              We will review your request.
            </p>

          </div>

        </div>

      </div>

    </section>

  `;
}


// =========================================================
// HELP & SUPPORT INTERACTIONS
// =========================================================

export function initHelpSupport() {

  const faqQuestions =
    document.querySelectorAll(".help-faq-question");

  const searchInput =
    document.querySelector(".help-search-input");

  const faqItems =
    document.querySelectorAll(".help-faq-item");

  const openSupportForm =
    document.querySelector("#openSupportForm");

  const closeSupportForm =
    document.querySelector("#closeSupportForm");

  const supportFormWrapper =
    document.querySelector("#supportFormWrapper");

  const supportForm =
    document.querySelector("#supportForm");

  const successMessage =
    document.querySelector("#helpSuccessMessage");

  const messageInput =
    document.querySelector("#supportMessage");

  const messageCount =
    document.querySelector("#supportMessageCount");


  // =======================================================
  // FAQ OPEN / CLOSE
  // =======================================================

  faqQuestions.forEach((question) => {

    question.addEventListener("click", () => {

      const faqItem =
        question.closest(".help-faq-item");

      const answer =
        faqItem.querySelector(".help-faq-answer");

      const icon =
        question.querySelector("span");

      const isOpen =
        faqItem.classList.contains("open");


      faqItems.forEach((item) => {

        item.classList.remove("open");

        const itemAnswer =
          item.querySelector(".help-faq-answer");

        const itemIcon =
          item.querySelector(".help-faq-question span");


        if (itemAnswer) {
          itemAnswer.style.display = "none";
        }


        if (itemIcon) {
          itemIcon.textContent = "+";
        }

      });


      if (!isOpen) {

        faqItem.classList.add("open");

        if (answer) {
          answer.style.display = "block";
        }

        if (icon) {
          icon.textContent = "−";
        }

      }

    });

  });


  // =======================================================
  // HELP SEARCH
  // =======================================================

  if (searchInput) {

    searchInput.addEventListener("input", () => {

      const searchTerm =
        searchInput.value.trim().toLowerCase();

      let visibleResults = 0;


      faqItems.forEach((item) => {

        const questionText =
          item
            .querySelector(".help-faq-question")
            ?.textContent
            .toLowerCase() || "";

        const answerText =
          item
            .querySelector(".help-faq-answer")
            ?.textContent
            .toLowerCase() || "";


        const matches =
          questionText.includes(searchTerm) ||
          answerText.includes(searchTerm);


        item.style.display =
          matches ? "block" : "none";


        if (matches) {
          visibleResults++;
        }

      });


      let noResultsMessage =
        document.querySelector(".help-no-results");


      if (noResultsMessage) {
        noResultsMessage.remove();
      }


      if (searchTerm && visibleResults === 0) {

        noResultsMessage =
          document.createElement("div");

        noResultsMessage.className =
          "help-no-results";

        noResultsMessage.textContent =
          "No results found. Try a different search.";


        document
          .querySelector(".help-faq-list")
          ?.appendChild(noResultsMessage);

      }

    });

  }


  // =======================================================
  // OPEN SUPPORT FORM
  // =======================================================

  if (openSupportForm && supportFormWrapper) {

    openSupportForm.addEventListener("click", () => {

      supportFormWrapper.hidden = false;

      if (successMessage) {
        successMessage.hidden = true;
      }

      supportFormWrapper.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

      document
        .querySelector("#supportName")
        ?.focus();

    });

  }


  // =======================================================
  // CLOSE SUPPORT FORM
  // =======================================================

  if (closeSupportForm && supportFormWrapper) {

    closeSupportForm.addEventListener("click", () => {

      supportFormWrapper.hidden = true;

    });

  }


  // =======================================================
  // CHARACTER COUNTER
  // =======================================================

  if (messageInput && messageCount) {

    messageInput.addEventListener("input", () => {

      messageCount.textContent =
        messageInput.value.length;

    });

  }


  // =======================================================
  // FORM VALIDATION + SUBMIT
  // =======================================================

  if (supportForm) {

    supportForm.addEventListener("submit", (event) => {

      event.preventDefault();


      const nameInput =
        document.querySelector("#supportName");

      const emailInput =
        document.querySelector("#supportEmail");

      const messageInput =
        document.querySelector("#supportMessage");


      const nameError =
        document.querySelector("#supportNameError");

      const emailError =
        document.querySelector("#supportEmailError");

      const messageError =
        document.querySelector("#supportMessageError");


      const name =
        nameInput?.value.trim() || "";

      const email =
        emailInput?.value.trim() || "";

      const message =
        messageInput?.value.trim() || "";


      // Clear old errors
      [
        nameError,
        emailError,
        messageError
      ].forEach((error) => {

        if (error) {
          error.textContent = "";
          error.hidden = true;
        }

      });


      [
        nameInput,
        emailInput,
        messageInput
      ].forEach((input) => {

        if (input) {
          input.removeAttribute("aria-invalid");
        }

      });


      let isValid = true;


      // NAME VALIDATION
      if (!name) {

        if (nameError) {

          nameError.textContent =
            "Please enter your name.";

          nameError.hidden = false;

        }

        nameInput?.setAttribute(
          "aria-invalid",
          "true"
        );

        isValid = false;

      }


      // EMAIL VALIDATION
      const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


      if (!email) {

        if (emailError) {

          emailError.textContent =
            "Please enter your email.";

          emailError.hidden = false;

        }

        emailInput?.setAttribute(
          "aria-invalid",
          "true"
        );

        isValid = false;

      } else if (!emailPattern.test(email)) {

        if (emailError) {

          emailError.textContent =
            "Please enter a valid email address.";

          emailError.hidden = false;

        }

        emailInput?.setAttribute(
          "aria-invalid",
          "true"
        );

        isValid = false;

      }


      // MESSAGE VALIDATION
      if (!message) {

        if (messageError) {

          messageError.textContent =
            "Please describe your problem.";

          messageError.hidden = false;

        }

        messageInput?.setAttribute(
          "aria-invalid",
          "true"
        );

        isValid = false;

      }


      // MESSAGE LENGTH VALIDATION
      if (message.length > 500) {

        if (messageError) {

          messageError.textContent =
            "Message must be 500 characters or less.";

          messageError.hidden = false;

        }

        messageInput?.setAttribute(
          "aria-invalid",
          "true"
        );

        isValid = false;

      }


      // STOP WHEN INVALID
      if (!isValid) {

        const firstInvalidField =
          supportForm.querySelector(
            '[aria-invalid="true"]'
          );

        firstInvalidField?.focus();

        return;

      }


      // FRONTEND SUCCESS STATE
      supportForm.reset();


      if (messageCount) {
        messageCount.textContent = "0";
      }


      if (successMessage) {

        successMessage.hidden = false;

        successMessage.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });

      }

    });

  }

}