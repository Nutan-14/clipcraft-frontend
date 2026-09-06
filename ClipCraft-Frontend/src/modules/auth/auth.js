// =====================================================
// CLIPCRAFT AUTHENTICATION
// =====================================================

// Resolve the image relative to this JavaScript file.
// This works with normal browser ES modules.
const logo = new URL(
    "../../assets/clipcraft_logo.png",
    import.meta.url
).href;
const editorIllustration = new URL(
    "../../assets/clipcraft_editor_illustration.png",
    import.meta.url
).href;


// =====================================================
// INITIALIZE AUTH
// =====================================================

export function initAuth() {

    const app = document.getElementById("app");
    function showLanding() {

    app.innerHTML = `

        <div class="landing-page">

            <!-- =========================
                 NAVBAR
                 ========================= -->

            <nav class="landing-navbar">

                <div class="landing-logo">

                    <img
                        src="${logo}"
                        alt="ClipCraft Logo"
                    >

                    <div>

                        <h2>ClipCraft</h2>

                        <p>
                            Next-Gen Video Editing
                        </p>

                    </div>

                </div>


               

                    

                <button
                    class="landing-signin"
                    id="landingSignIn"
                >
                    Sign In
                </button>

            </nav>


            <!-- =========================
                 HERO
                 ========================= -->

            <section
                class="landing-hero"
                id="home"
            >

                <div class="hero-content">

                    <span class="hero-badge">
                        ✨ Next-Generation Video Editor
                    </span>


                    <h1>
                        Create.
                        Edit.<br>

                        <span>
                            Inspire.
                        </span>
                    </h1>


                    <p class="hero-description">

                        Turn your ideas into engaging videos
                        with powerful editing tools built for
                        the next generation of creators.

                    </p>


                    <div class="hero-buttons">

                        <button
                            class="hero-primary-btn"
                            id="landingCreateAccount"
                        >
                            Create Account →
                        </button>


                        <button
                            class="hero-secondary-btn"
                            id="landingExplore"
                        >
                            Explore ClipCraft
                        </button>

                    </div>

                </div>


                <!-- =========================
                     FIGMA EDITOR IMAGE
                     ========================= -->

                <div class="hero-visual">

                    <div class="hero-glow"></div>

                    <img
                        src="${editorIllustration}"
                        alt="ClipCraft video editor"
                        class="hero-editor-image"
                    >

                </div>

            </section>


            <!-- =========================
                 FEATURES
                 ========================= -->

            <section
                class="landing-features"
                id="features"
            >

                <h2>
                    Everything You Need to Create
                </h2>

                <p class="features-subtitle">

                    Powerful tools designed to make
                    video editing simple and creative.

                </p>


                <div class="features-grid">

                    <div class="feature-card">

                        <div class="feature-card-icon">
                            ⚡
                        </div>

                        <h3>
                            Lightning Fast
                        </h3>

                        <p>
                            Edit your videos smoothly
                            with a fast and responsive
                            workspace.
                        </p>

                    </div>


                    <div class="feature-card">

                        <div class="feature-card-icon">
                            🎬
                        </div>

                        <h3>
                            Powerful Editing
                        </h3>

                        <p>
                            Trim, split, arrange and
                            enhance your video projects.
                        </p>

                    </div>


                    

            </section>


            <!-- =========================
                 CTA
                 ========================= -->

            <section class="landing-cta">

                <div class="landing-cta-box">

                    <h2>
                        Ready to Create?
                    </h2>

                    <p>
                        Start creating amazing videos
                        with ClipCraft today.
                    </p>

                    <button
                        class="hero-primary-btn"
                        id="landingCTA"
                    >
                        Create Your Account →
                    </button>

                </div>

            </section>


            <!-- =========================
                 FOOTER
                 ========================= -->

            <footer class="landing-footer">

                © 2024 ClipCraft.
                All rights reserved.

            </footer>

        </div>

    `;


    // =====================================================
    // SIGN IN
    // =====================================================

    const landingSignIn =
        document.getElementById("landingSignIn");

    if (landingSignIn) {

        landingSignIn.addEventListener(
            "click",
            () => {
                showLogin();
            }
        );

    }


    // =====================================================
    // CREATE ACCOUNT
    // =====================================================

    const landingCreateAccount =
        document.getElementById("landingCreateAccount");

    if (landingCreateAccount) {

        landingCreateAccount.addEventListener(
            "click",
            () => {
                showSignup();
            }
        );

    }


    // =====================================================
    // CTA CREATE ACCOUNT
    // =====================================================

    const landingCTA =
        document.getElementById("landingCTA");

    if (landingCTA) {

        landingCTA.addEventListener(
            "click",
            () => {
                showSignup();
            }
        );

    }


    // =====================================================
    // EXPLORE
    // =====================================================

    const landingExplore =
        document.getElementById("landingExplore");

    if (landingExplore) {

        landingExplore.addEventListener(
            "click",
            () => {

                document
                    .getElementById("features")
                    .scrollIntoView({
                        behavior: "smooth"
                    });

            }
        );

    }

}

    if (!app) {
        console.error("ClipCraft: #app element not found.");
        return;
    }


    // =====================================================
    // LOGIN PAGE
    // =====================================================

    function showLogin() {

        app.innerHTML = `

            <div class="auth-page">

                <!-- LEFT BRANDING SECTION -->

                <section class="auth-brand">

                    <div class="brand-logo">

                        <img
                            src="${logo}"
                            alt="ClipCraft Logo"
                            class="brand-logo-image"
                        >

                        <div>
                            <h1>ClipCraft</h1>
                            <p>Next-Gen Video Editing</p>
                        </div>

                    </div>


                    <div class="brand-content">

                        <h2>
                            Edit. Create.<br>
                            <span>Inspire.</span>
                        </h2>

                        <p class="brand-description">
                            Powerful tools for next-gen
                            video storytellers.
                        </p>
                        <div class="auth-editor-visual">
                            <img
                                src="${editorIllustration}"
                                alt="ClipCraft video editor"
                                class="auth-editor-image"
                            >
                        </div>


                        <div class="brand-features">

                            <!-- LIGHTNING FAST -->

                            <div class="feature-item">

                                <div class="feature-symbol">

                                    <span class="feature-icon lightning-icon">
                                        ⚡
                                    </span>

                                </div>

                                <div>

                                    <h3>Lightning Fast</h3>

                                    <p>
                                        Real-time editing with zero lag.
                                    </p>

                                </div>

                            </div>


                            <!-- ALL IN ONE -->

                            <div class="feature-item">

                                <div class="feature-symbol">

                                    <span class="feature-icon ai-icon">
                                        ✨
                                    </span>

                                </div>

                                <div>

                                    <h3>All in One</h3>

                                    <p>
                                        Video, audio, effects & more.
                                    </p>

                                </div>

                            </div>


                            <!-- CLOUD SYNC -->

                            <div class="feature-item">

                                <div class="feature-symbol">

                                    <span class="feature-icon cloud-icon">
                                        ☁
                                    </span>

                                </div>

                                <div>

                                    <h3>Cloud Sync</h3>

                                    <p>
                                        Access your projects anywhere.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>


                    <div class="brand-footer">
                        © 2024 ClipCraft. All rights reserved.
                    </div>

                </section>


                <!-- RIGHT LOGIN SECTION -->

                <section class="auth-container">

                    <div class="auth-card">

                        <!-- AUTH LOGO -->

                        <div class="auth-logo">

                            <img
                                src="${logo}"
                                alt="ClipCraft Logo"
                                class="auth-logo-image"
                            >

                        </div>


                        <h1>
                            Welcome Back!
                        </h1>

                        <p class="auth-subtitle">
                            Sign in to continue to ClipCraft
                        </p>


                        <!-- LOGIN FORM -->

                        <form id="loginForm">

                            <label for="email">
                                Email address
                            </label>

                            <div class="input-box">

                               <span class="input-icon email-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="1.8"
                                    stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                                    <path d="m3 7 9 6 9-6"></path>
                                    </svg>
                                </span>

                                <input
                                    type="email"
                                    id="email"
                                    placeholder="you@example.com"
                                    required
                                >

                            </div>


                            <label for="password">
                                Password
                            </label>

                            <div class="input-box">

                                <span class="input-icon">
                                    <span class="input-icon">
                                        <svg class="icon" xmlns="http://www.w3.org/2000/svg"
                                            width="20" height="20" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" stroke-width="1.8"
                                            stroke-linecap="round" stroke-linejoin="round">
                                            <rect x="5" y="11" width="14" height="10" rx="2"></rect>
                                            <path d="M8 11V7a4 4 0 0 1 8 0v4"></path>
                                        </svg>
                                    </span>
                                </span>

                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Enter your password"
                                    required
                                >

                                <button
                                    type="button"
                                    id="togglePassword"
                                    class="password-toggle"
                                    aria-label="Show or hide password"
                                >
                                    👁
                                </button>

                            </div>


                            <div class="auth-options">

                                <label>

                                    <input
                                        type="checkbox"
                                        id="rememberMe"
                                    >

                                    Remember me

                                </label>


                                <a
                                    href="#"
                                    id="forgotPassword"
                                >
                                    Forgot Password?
                                </a>

                            </div>


                            <button type="submit">
                                Sign In →
                            </button>

                        </form>


                        <!-- DIVIDER -->

                        <div class="divider">

                            <span>
                                or continue with
                            </span>

                        </div>


                        <!-- SOCIAL LOGIN -->

                       <div class="social-login">

                            <button
                             type="button"
                            id="googleLogin"
                            >
                             Continue with Google
                            </button>

                        </div>


                        <!-- SIGN UP -->

                        <p class="signup-text">

                            Don't have an account?

                            <a
                                href="#"
                                id="showSignup"
                            >
                                Sign up
                            </a>

                        </p>

                    </div>

                </section>

            </div>
        `;


        // =====================================================
        // PASSWORD SHOW / HIDE
        // =====================================================

        const passwordInput =
            document.getElementById("password");

        const togglePassword =
            document.getElementById("togglePassword");


        if (passwordInput && togglePassword) {

            togglePassword.addEventListener(
                "click",
                () => {

                    if (passwordInput.type === "password") {

                        passwordInput.type = "text";

                        // Avoid monkey emoji.
                        togglePassword.textContent = "◉";

                    } else {

                        passwordInput.type = "password";

                        togglePassword.textContent = "👁";

                    }

                }
            );

        }


        // =====================================================
        // LOGIN FORM
        // =====================================================

        const loginForm =
            document.getElementById("loginForm");


        if (loginForm) {

            loginForm.addEventListener(
                "submit",
                (event) => {

                    event.preventDefault();


                    const email =
                        document
                            .getElementById("email")
                            .value
                            .trim();


                    const password =
                        document
                            .getElementById("password")
                            .value;


                    if (!email || !password) {

                        alert(
                            "Please enter email and password."
                        );

                        return;
                    }


                    alert(
                        "Sign In successful! Backend authentication will be connected later."
                    );

                }
            );

        }


        // =====================================================
        // FORGOT PASSWORD
        // =====================================================

        const forgotPassword =
            document.getElementById("forgotPassword");


        if (forgotPassword) {

            forgotPassword.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();

                    showForgotPassword();

                }
            );

        }


        // =====================================================
        // SIGN UP
        // =====================================================

        const showSignupButton =
            document.getElementById("showSignup");


        if (showSignupButton) {

            showSignupButton.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();

                    showSignup();

                }
            );

        }


        // =====================================================
        // GOOGLE LOGIN
        // =====================================================

        const googleLogin =
            document.getElementById("googleLogin");


        if (googleLogin) {

            googleLogin.addEventListener(
                "click",
                () => {

                    alert(
                        "Google Sign-In will be connected here."
                    );

                }
            );

        }

    }


    // =====================================================
    // SIGN UP PAGE
    // =====================================================

    function showSignup() {

        app.innerHTML = `

            <div class="auth-page">

                <!-- LEFT BRANDING -->

                <section class="auth-brand">

                    <div class="brand-logo">

                        <img
                            src="${logo}"
                            alt="ClipCraft Logo"
                            class="brand-logo-image"
                        >

                        <div>
                            <h1>ClipCraft</h1>
                            <p>Next-Gen Video Editing</p>
                        </div>

                    </div>


                    <div class="brand-content">

                        <h2>
                            Edit. Create.<br>
                            <span>Inspire.</span>
                        </h2>

                        <p class="brand-description">
                            Powerful tools for next-gen
                            video storytellers.
                        </p>
                        <div class="auth-editor-visual">
                            <img
                                src="${editorIllustration}"
                                alt="ClipCraft video editor"
                                class="auth-editor-image"
                            >
                        </div>


                        <div class="brand-features">

                            <div class="feature-item">

                                <div class="feature-symbol">
                                    <span class="feature-icon lightning-icon">
                                        ⚡
                                    </span>
                                </div>

                                <div>

                                    <h3>Lightning Fast</h3>

                                    <p>
                                        Real-time editing with zero lag.
                                    </p>

                                </div>

                            </div>


                            <div class="feature-item">

                                <div class="feature-symbol">
                                    <span class="feature-icon ai-icon">
                                        ✨
                                    </span>
                                </div>

                                <div>

                                    <h3>All in One</h3>

                                    <p>
                                        Video, audio, effects & more.
                                    </p>

                                </div>

                            </div>


                            <div class="feature-item">

                                <div class="feature-symbol">
                                    <span class="feature-icon cloud-icon">
                                        ☁
                                    </span>
                                </div>

                                <div>

                                    <h3>Cloud Sync</h3>

                                    <p>
                                        Access your projects anywhere.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>


                    <div class="brand-footer">
                        © 2024 ClipCraft. All rights reserved.
                    </div>

                </section>


                <!-- RIGHT SIGN UP -->

                <section class="auth-container">

                    <div class="auth-card">

                        <h1>
                            Create Account
                        </h1>

                        <p class="auth-subtitle">
                            Join ClipCraft to start editing today.
                        </p>


                        <form id="signupForm">

                            <label for="signupName">
                                Full Name
                            </label>

                            <div class="input-box">

                                <span class="input-icon">
                                    👤
                                </span>

                                <input
                                    type="text"
                                    id="signupName"
                                    placeholder="Jane Doe"
                                    required
                                >

                            </div>


                            <label for="signupEmail">
                                Email
                            </label>

                            <div class="input-box">

                                <span class="input-icon">
                                    ✉
                                </span>

                                <input
                                    type="email"
                                    id="signupEmail"
                                    placeholder="jane@example.com"
                                    required
                                >

                            </div>


                            <label for="signupPassword">
                                Password
                            </label>

                            <div class="input-box">

                                <span class="input-icon">
                                    🔒
                                </span>

                                <input
                                    type="password"
                                    id="signupPassword"
                                    placeholder="Create a password"
                                    required
                                >

                                <button
                                    type="button"
                                    id="toggleSignupPassword"
                                    class="password-toggle"
                                    aria-label="Show or hide password"
                                >
                                    👁
                                </button>

                            </div>


                            <label for="confirmPassword">
                                Confirm Password
                            </label>

                            <div class="input-box">

                                <span class="input-icon">
                                    🔒
                                </span>

                                <input
                                    type="password"
                                    id="confirmPassword"
                                    placeholder="Confirm your password"
                                    required
                                >

                            </div>


                            <div class="terms-option">

                                <label>

                                    <input
                                        type="checkbox"
                                        id="terms"
                                        required
                                    >

                                    I agree to the Terms & Conditions

                                </label>

                            </div>


                            <button type="submit">
                                Create Account →
                            </button>

                        </form>


                        <div class="divider">

                            <span>
                                or continue with
                            </span>

                        </div>
                        <div class="social-login">

                            <button
                            type="button"
                            id="signupGoogle"
                             >
                            Continue with Google
                            </button>

                        </div>


                        <p class="signup-text">

                            Already have an account?

                            <a
                                href="#"
                                id="backToLogin"
                            >
                                Sign In
                            </a>

                        </p>

                    </div>

                </section>

            </div>
        `;


        // =====================================================
        // SIGNUP PASSWORD
        // =====================================================

        const signupPassword =
            document.getElementById("signupPassword");

        const toggleSignupPassword =
            document.getElementById(
                "toggleSignupPassword"
            );


        if (
            signupPassword &&
            toggleSignupPassword
        ) {

            toggleSignupPassword.addEventListener(
                "click",
                () => {

                    if (
                        signupPassword.type === "password"
                    ) {

                        signupPassword.type = "text";

                        toggleSignupPassword.textContent =
                            "◉";

                    } else {

                        signupPassword.type = "password";

                        toggleSignupPassword.textContent =
                            "👁";

                    }

                }
            );

        }


        // =====================================================
        // SIGNUP FORM
        // =====================================================

        const signupForm =
            document.getElementById("signupForm");


        if (signupForm) {

            signupForm.addEventListener(
                "submit",
                (event) => {

                    event.preventDefault();


                    const name =
                        document
                            .getElementById("signupName")
                            .value
                            .trim();


                    const password =
                        document
                            .getElementById("signupPassword")
                            .value;


                    const confirmPassword =
                        document
                            .getElementById("confirmPassword")
                            .value;


                    const terms =
                        document.getElementById("terms");


                    if (
                        password !== confirmPassword
                    ) {

                        alert(
                            "Passwords do not match."
                        );

                        return;
                    }


                    if (!terms.checked) {

                        alert(
                            "Please agree to the Terms & Conditions."
                        );

                        return;
                    }


                    alert(
                        `Account created successfully for ${name}! Backend registration will be connected later.`
                    );


                    showLogin();

                }
            );

        }


        // =====================================================
        // GOOGLE SIGNUP
        // =====================================================

        const signupGoogle =
            document.getElementById("signupGoogle");


        if (signupGoogle) {

            signupGoogle.addEventListener(
                "click",
                () => {

                    alert(
                        "Google Sign-Up will be connected when the backend service is ready."
                    );

                }
            );

        }


        // =====================================================
        // BACK TO LOGIN
        // =====================================================

        const backToLogin =
            document.getElementById("backToLogin");


        if (backToLogin) {

            backToLogin.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();

                    showLogin();

                }
            );

        }

    }


    // =====================================================
    // FORGOT PASSWORD PAGE
    // =====================================================

    function showForgotPassword() {

        app.innerHTML = `

            <div class="auth-page">

                <section class="auth-container">

                    <div class="auth-card">

                        <h1>
                            Forgot Password?
                        </h1>

                        <p class="auth-subtitle">
                            Enter your email address to reset your password.
                        </p>


                        <form id="resetPasswordForm">

                            <label for="resetEmail">
                                Email address
                            </label>

                            <div class="input-box">

                                <span class="input-icon">
                                    ✉
                                </span>

                                <input
                                    type="email"
                                    id="resetEmail"
                                    placeholder="you@example.com"
                                    required
                                >

                            </div>


                            <button type="submit">
                                Reset Password →
                            </button>

                        </form>


                        <p class="signup-text">

                            Remember your password?

                            <a
                                href="#"
                                id="resetBackToLogin"
                            >
                                Sign in
                            </a>

                        </p>

                    </div>

                </section>

            </div>
        `;


        // =====================================================
        // RESET PASSWORD
        // =====================================================

        const resetPasswordForm =
            document.getElementById(
                "resetPasswordForm"
            );


        if (resetPasswordForm) {

            resetPasswordForm.addEventListener(
                "submit",
                (event) => {

                    event.preventDefault();


                    const email =
                        document
                            .getElementById("resetEmail")
                            .value
                            .trim();


                    if (!email) {

                        alert(
                            "Please enter your email address."
                        );

                        return;
                    }


                    alert(
                        "Password reset request submitted successfully. The actual reset email will work after the backend email service is connected."
                    );

                }
            );

        }


        // =====================================================
        // BACK TO LOGIN
        // =====================================================

        const resetBackToLogin =
            document.getElementById(
                "resetBackToLogin"
            );


        if (resetBackToLogin) {

            resetBackToLogin.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();

                    showLogin();

                }
            );

        }

    }


    // =====================================================
    // START AUTHENTICATION
    // =====================================================

    showLanding();


    console.log(
        "ClipCraft authentication initialized"
    );

}
