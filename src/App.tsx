import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { motion, MotionConfig } from "motion/react";
import {
  ArrowDownLeft,
  ChartNoAxesCombined,
  CheckCircle2,
  Clock3,
  Copy,
  Flame,
  Pencil,
  RotateCcw,
  SlidersHorizontal,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronRight,
  Chrome,
  CircleHelp,
  Compass,
  Eye,
  EyeOff,
  Github,
  Layers3,
  Menu,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  Wallet,
  Waves,
  X,
} from "lucide-react";

export default function App() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const sync = () => setPath(window.location.pathname);
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);
  const navigate = (next: string) => {
    window.history.pushState({}, "", next);
    setPath(next);
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    document.title =
      path === "/signup"
        ? "Join Poolers — Aurora Sign Up"
        : path.startsWith("/app")
          ? "Poolers — Your liquidity workspace"
          : "Poolers — Everyone is an LP.";
  }, [path]);
  const launchApp = () => navigate("/app");
  return (
    <MotionConfig reducedMotion="user">
      {path === "/signup" ? (
        <SignUp onHome={() => navigate("/")} onLaunch={launchApp} />
      ) : path.startsWith("/app") ||
        path.startsWith("/pools/") ||
        path.startsWith("/strategy/") ||
        path === "/profile" ? (
        <PoolersTerminal
          onHome={() => navigate("/")}
          onOnboarding={() => navigate("/signup")}
        />
      ) : (
        <PoolersHome onSignUp={launchApp} />
      )}
    </MotionConfig>
  );
}

function BrandMark({ size = 38 }: { size?: number }) {
  const id = useId().replaceAll(":", "");
  const outline =
    "M38 15H77c27 0 45 17 40 42-5 24-23 37-51 37H45l-7 23a8 8 0 0 1-8 6H13a7 7 0 0 1-7-9L33 21a6 6 0 0 1 5-6Z";
  const cutout =
    "M74 25h10c-8 22-3 31 24 31l-3 10c-27 0-38 9-45 31H49c8-22 3-31-25-31l3-10c28 0 39-9 47-31Z";
  return (
    <svg
      viewBox="0 0 128 128"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      className="brand-mark"
      shapeRendering="geometricPrecision"
    >
      <defs>
        <linearGradient id={`brand-${id}`} x1="0" y1="0" x2=".35" y2="1">
          <stop stopColor="#d2b7ff" />
          <stop offset=".42" stopColor="#b38aff" />
          <stop offset="1" stopColor="#7b47ee" />
        </linearGradient>
        <clipPath id={`brand-clip-${id}`}>
          <path d={outline} />
        </clipPath>
      </defs>
      <path
        d={`${outline} ${cutout}`}
        fillRule="evenodd"
        clipPath={`url(#brand-clip-${id})`}
        fill={`url(#brand-${id})`}
      />
    </svg>
  );
}

const reveal = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
type Profile = {
  firstName: string;
  lastName: string;
  email: string;
  interest: string;
  experience: string;
};

function SignUp({
  onHome,
  onLaunch,
}: {
  onHome: () => void;
  onLaunch: () => void;
}) {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState("");
  const [complete, setComplete] = useState(false);
  const stepHeading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    stepHeading.current?.focus({ preventScroll: true });
  }, [step, complete]);
  const [profile, setProfile] = useState<Profile>({
    firstName: "",
    lastName: "",
    email: "",
    interest: "Discover strategies",
    experience: "Getting started",
  });
  const heading =
    step === 1
      ? "Create New Profile"
      : step === 2
        ? "Make it your space"
        : "Your next chapter starts here";
  const subtitle =
    step === 1
      ? "Input your basic details to begin the journey."
      : step === 2
        ? "A few details to personalize your Poolers experience."
        : "Take a moment to review your profile.";
  const register = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setProfile({
      ...profile,
      firstName: String(data.get("firstName")).trim(),
      lastName: String(data.get("lastName")).trim(),
      email: String(data.get("email")).trim(),
    });
    event.currentTarget.reset();
    setStep(2);
  };
  const finish = () => {
    setComplete(true);
  };
  return (
    <main className="signup flex min-h-screen w-full bg-black selection:bg-white/30 p-2 transition-all duration-500 lg:h-screen lg:overflow-hidden lg:p-4">
      <aside className="signup-hero hidden lg:flex lg:w-[52%] relative flex-col items-center justify-end pb-32 px-12 rounded-3xl overflow-hidden shadow-2xl h-full">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          aria-label="Abstract flowing aurora"
          poster="/aurora-poster.svg"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260506_081238_406ed0e3-5d83-436e-a512-0bbff7ec5b95.mp4"
            type="video/mp4"
          />
        </video>
        <button
          type="button"
          onClick={onHome}
          className="signup-back absolute top-8 left-8 z-10"
          aria-label="Back to Poolers"
        >
          <ArrowLeft size={17} /> Back to Poolers
        </button>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.2 },
            },
          }}
          className="z-10 w-full max-w-xs space-y-8 signup-hero-content"
        >
          <motion.div
            variants={reveal}
            className="flex items-center justify-center gap-2.5"
          >
            <BrandMark size={40} />
            <span className="text-xl font-semibold tracking-tight">
              poolers
            </span>
          </motion.div>
          <motion.div variants={reveal} className="text-center space-y-4">
            <h1 className="text-4xl font-medium tracking-tight whitespace-nowrap">
              Join Poolers
            </h1>
            <p className="text-white/60 text-sm leading-relaxed px-4">
              Follow these 3 quick phases to activate your space.
            </p>
          </motion.div>
          <motion.div variants={reveal} className="space-y-3">
            <StepItem
              number={1}
              text="Register your identity"
              active={step === 1}
            />
            <StepItem
              number={2}
              text="Configure your studio"
              active={step === 2}
            />
            <StepItem
              number={3}
              text="Finalize your profile"
              active={step === 3}
            />
          </motion.div>
        </motion.div>
        <div className="signup-caption absolute bottom-7 left-0 w-full text-center z-10">
          A little clarity. A world of possibility.
        </div>
      </aside>
      <section className="flex-1 flex flex-col items-center justify-center py-12 lg:py-6 px-4 sm:px-12 lg:px-16 xl:px-24 overflow-y-auto lg:overflow-hidden">
        <button
          className="mobile-signup-brand lg:hidden"
          onClick={onHome}
          type="button"
        >
          <BrandMark size={34} /> poolers{" "}
          <span>
            Back home <ArrowLeft size={15} />
          </span>
        </button>
        <motion.div
          key={complete ? "complete" : step}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-xl space-y-8 lg:space-y-6 sm:space-y-10 signup-form-content"
        >
          {complete ? (
            <div className="completion">
              <span className="completion-icon">
                <Check size={29} />
              </span>
              <p className="eyebrow">YOU'RE READY TO EXPLORE</p>
              <h1 ref={stepHeading} tabIndex={-1}>
                Welcome to your next move, {profile.firstName}.
              </h1>
              <p>
                Your profile preview is ready. Explore the Poolers interface and
                discover your next strategy.
              </p>
              <div className="signup-preview-notice">
                <ShieldCheck size={18} />
                <span>
                  This is a design preview. No account has been created and no
                  password has been stored.
                </span>
              </div>
              <button
                type="button"
                className="signup-submit"
                onClick={onLaunch}
              >
                Explore Poolers <ArrowRight size={18} />
              </button>
            </div>
          ) : (
            <>
              <header aria-live="polite">
                <div className="signup-eyebrow">
                  <span /> YOUR POOLERS JOURNEY{" "}
                  <span className="ml-auto">0{step} / 03</span>
                </div>
                <h2
                  ref={stepHeading}
                  tabIndex={-1}
                  className="text-3xl font-medium tracking-tight outline-none"
                >
                  {heading}
                </h2>
                <p className="text-white/40 text-sm mt-3">{subtitle}</p>
              </header>
              {step === 1 ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <SocialButton
                      icon={<Chrome size={18} />}
                      label="Google"
                      onClick={() =>
                        setNotice(
                          "Google sign-in is not connected in this design preview. You can explore the three-step flow using the form below.",
                        )
                      }
                    />
                    <SocialButton
                      icon={<Github size={18} />}
                      label="Github"
                      onClick={() =>
                        setNotice(
                          "GitHub sign-in is not connected in this design preview. You can explore the three-step flow using the form below.",
                        )
                      }
                    />
                  </div>
                  <div className="signup-divider">
                    <span className="bg-black px-4 text-xs font-medium text-white/40 uppercase tracking-widest">
                      Or
                    </span>
                  </div>
                  <form onSubmit={register} className="space-y-5 signup-fields">
                    <div className="grid grid-cols-2 gap-4">
                      <InputGroup
                        label="First Name"
                        placeholder="Jamie"
                        type="text"
                        name="firstName"
                        autoComplete="given-name"
                        defaultValue={profile.firstName}
                      />
                      <InputGroup
                        label="Last Name"
                        placeholder="Carter"
                        type="text"
                        name="lastName"
                        autoComplete="family-name"
                        defaultValue={profile.lastName}
                      />
                    </div>
                    <InputGroup
                      label="Email"
                      placeholder="you@example.com"
                      type="email"
                      name="email"
                      autoComplete="email"
                      defaultValue={profile.email}
                    />
                    <div>
                      <div className="relative">
                        <InputGroup
                          label="Password"
                          placeholder="Create your password"
                          type={showPassword ? "text" : "password"}
                          name="password"
                          autoComplete="new-password"
                          minLength={8}
                        />
                        <button
                          className="password-toggle"
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                          aria-pressed={showPassword}
                        >
                          {showPassword ? (
                            <EyeOff size={17} />
                          ) : (
                            <Eye size={17} />
                          )}
                        </button>
                      </div>
                      <p className="text-white/30 text-xs mt-2">
                        Requires at least 8 symbols.
                      </p>
                    </div>
                    <button
                      type="submit"
                      className="signup-submit w-full h-14 bg-white text-black font-semibold rounded-xl hover:bg-white/90 active:scale-[0.98] mt-4"
                    >
                      Create Account <ArrowRight size={17} />
                    </button>
                  </form>
                  <p className="signup-login">
                    Member of the team?{" "}
                    <a
                      href="https://poolers.xyz"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Log in <ChevronRight size={13} />
                    </a>
                  </p>
                </>
              ) : step === 2 ? (
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    setStep(3);
                  }}
                  className="space-y-6"
                >
                  <fieldset className="signup-options">
                    <legend>What brings you to Poolers?</legend>
                    {[
                      "Discover strategies",
                      "Manage my liquidity",
                      "Build a community",
                    ].map((option) => (
                      <label
                        key={option}
                        className={
                          profile.interest === option ? "selected" : ""
                        }
                      >
                        <input
                          type="radio"
                          name="interest"
                          value={option}
                          checked={profile.interest === option}
                          onChange={() =>
                            setProfile({ ...profile, interest: option })
                          }
                        />
                        <span>{option}</span>
                        <ChevronRight size={16} />
                      </label>
                    ))}
                  </fieldset>
                  <label className="signup-select-label">
                    Your experience
                    <select
                      value={profile.experience}
                      onChange={(event) =>
                        setProfile({
                          ...profile,
                          experience: event.target.value,
                        })
                      }
                    >
                      <option>Getting started</option>
                      <option>A few pools in</option>
                      <option>Experienced LP</option>
                    </select>
                  </label>
                  <button type="submit" className="signup-submit">
                    Continue <ArrowRight size={17} />
                  </button>
                  <button
                    type="button"
                    className="signup-text-button"
                    onClick={() => setStep(1)}
                  >
                    <ArrowLeft size={14} /> Back to your details
                  </button>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="profile-review">
                    <div className="profile-avatar">
                      {profile.firstName[0]}
                      {profile.lastName[0]}
                    </div>
                    <h3>
                      {profile.firstName} {profile.lastName}
                    </h3>
                    <p>{profile.email}</p>
                    <dl>
                      <div>
                        <dt>Your focus</dt>
                        <dd>{profile.interest}</dd>
                      </div>
                      <div>
                        <dt>Your experience</dt>
                        <dd>{profile.experience}</dd>
                      </div>
                    </dl>
                  </div>
                  <div className="signup-preview-notice">
                    <Sparkles size={18} />
                    <span>
                      Explore freely. This preview uses sample data and does not
                      connect a wallet or create a live account.
                    </span>
                  </div>
                  <button
                    className="signup-submit"
                    type="button"
                    onClick={finish}
                  >
                    Finish my profile <ArrowRight size={17} />
                  </button>
                  <button
                    type="button"
                    className="signup-text-button"
                    onClick={() => setStep(2)}
                  >
                    <ArrowLeft size={14} /> Edit preferences
                  </button>
                </div>
              )}
              <p className="signup-legal">
                <ShieldCheck size={13} /> Design preview · Your password is
                never saved.
              </p>
            </>
          )}
        </motion.div>
      </section>
      {notice && (
        <PreviewNotice message={notice} onClose={() => setNotice("")} />
      )}
    </main>
  );
}

function PreviewNotice({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const node = dialog.current;
    const opener =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    node?.showModal();
    return () => {
      node?.close();
      opener?.focus({ preventScroll: true });
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      aria-labelledby="notice-title"
      className="notice-native"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="notice-dialog">
        <button
          type="button"
          onClick={onClose}
          className="notice-close"
          aria-label="Close notice"
          autoFocus
        >
          <X size={18} />
        </button>
        <BrandMark size={46} />
        <h2 id="notice-title">A look at what's next.</h2>
        <p>{message}</p>
        <button type="button" className="signup-submit" onClick={onClose}>
          Continue exploring
        </button>
      </div>
    </dialog>
  );
}

function PoolersHome({ onSignUp }: { onSignUp: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [faq, setFaq] = useState<number | null>(0);
  const questions = [
    [
      "What is Poolers?",
      "Poolers is a workspace for discovering Solana liquidity pools, exploring LP strategies, and following the people behind them. It brings your liquidity positions into one clearer view.",
    ],
    [
      "Do I need to be an experienced LP?",
      "You can explore the interface and compare strategies before getting started. Each strategy should be reviewed carefully: providing liquidity involves market risk and impermanent loss.",
    ],
    [
      "Can I try the platform before connecting a wallet?",
      "Yes. This interactive preview lets you explore sample pools, time periods, and strategies without connecting a wallet. The figures shown are illustrative demo data.",
    ],
    [
      "What happens when I get started?",
      "You will enter the interactive Poolers workspace. Try the demo wallet, create and join strategies, and explore your portfolio. All balances and actions are simulated.",
    ],
  ];
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  const goTo = (id: string) => {
    setMenuOpen(false);
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
  };
  return (
    <div className="ph-landing">
      <nav className="ph-nav" aria-label="Main navigation">
        <a className="ph-brand" href="#" aria-label="Poolers home">
          <BrandMark size={36} />
          <span>
            poolers<span className="ph-brand-dot">.</span>
          </span>
        </a>
        <div className="ph-nav-links">
          <button onClick={() => goTo("platform")}>The platform</button>
          <button onClick={() => goTo("how-it-works")}>How it works</button>
          <button onClick={() => goTo("community")}>For everyone</button>
          <button onClick={() => goTo("faqs")}>FAQs</button>
        </div>
        <div className="ph-nav-actions">
          <span className="ph-built-on">
            <span className="ph-solana-lines">
              <i />
              <i />
              <i />
            </span>
            Built on Solana
          </span>
          <button className="ph-nav-cta" onClick={onSignUp}>
            Open app <ArrowUpRight size={15} />
          </button>
          <button
            className="ph-menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>
      {menuOpen && (
        <div className="ph-mobile-menu">
          <button onClick={() => goTo("platform")}>
            The platform <ArrowRight size={16} />
          </button>
          <button onClick={() => goTo("how-it-works")}>
            How it works <ArrowRight size={16} />
          </button>
          <button onClick={() => goTo("community")}>
            For everyone <ArrowRight size={16} />
          </button>
          <button onClick={() => goTo("faqs")}>
            FAQs <ArrowRight size={16} />
          </button>
          <button onClick={onSignUp}>
            Open app <ArrowUpRight size={16} />
          </button>
        </div>
      )}

      <header className="ph-hero">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="ph-eyebrow"
        >
          <span className="ph-status-light" />A new current in liquidity
          <span className="ph-eyebrow-separator" />
          <ArrowUpRight size={12} />
        </motion.div>
        <h1>
          <span className="ph-headline-mask">
            <motion.span
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.85,
                delay: 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Everyone is an LP.
            </motion.span>
          </span>
          <span className="ph-headline-mask">
            <motion.span
              className="ph-headline-accent"
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.85,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Including you.
            </motion.span>
          </span>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          Discover thoughtful strategies. Follow experienced LPs.
          <br className="ph-desktop-break" /> Put your liquidity in good
          company.
        </motion.p>
        <motion.div
          className="ph-hero-actions"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.52 }}
        >
          <button className="ph-primary" onClick={onSignUp}>
            Start pooling <ArrowUpRight size={18} />
          </button>
          <button className="ph-secondary" onClick={() => goTo("platform")}>
            Explore the platform <ArrowDownLeft size={15} />
          </button>
        </motion.div>
        <motion.div
          className="ph-hero-note"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <span className="ph-mini-avatars">
            <span>j</span>
            <span>m</span>
            <span>a</span>
          </span>
          <span>Made for a more connected kind of LP.</span>
        </motion.div>
      </header>

      <section
        className="ph-showcase"
        id="platform"
        aria-label="Interactive Poolers platform preview"
      >
        <div className="ph-glow ph-glow-purple" />
        <div className="ph-glow ph-glow-teal" />
        <div className="ph-dot-field" />
        <motion.div
          className="ph-dashboard-bezel ph-terminal-showcase"
          initial={{ opacity: 0, y: 45 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
        >
          <button
            className="ph-terminal-preview-link"
            onClick={onSignUp}
            aria-label="Open interactive Poolers workspace"
          >
            <picture>
              <source
                media="(max-width:700px)"
                srcSet="/terminal-preview-mobile.png"
              />
              <img
                src="/terminal-preview.png"
                alt="Poolers terminal with pool discovery, a market chart, strategies and a liquidity composer"
                width="1440"
                height="1000"
                loading="eager"
              />
            </picture>
            <span className="ph-preview-launch">
              Open the interactive workspace <ArrowUpRight size={16} />
            </span>
          </button>
        </motion.div>
        <div className="ph-showcase-caption">
          <span className="ph-caption-line" />
          <span>LESS FRICTION. MORE FLOW.</span>
          <span className="ph-caption-line" />
        </div>
      </section>

      <section className="ph-how-section" id="how-it-works">
        <div className="ph-section-intro">
          <span className="ph-section-label">A BETTER WAY TO POOL</span>
          <h2>
            Find your people.
            <br />
            <span>Then find your flow.</span>
          </h2>
          <p>
            Liquidity can feel complicated. Your experience doesn’t have to.
          </p>
        </div>
        <div className="ph-how-steps">
          {[
            {
              number: "01",
              icon: Compass,
              title: "Find your starting point.",
              text: "Discover pools and compare strategies in one thoughtful workspace.",
            },
            {
              number: "02",
              icon: Users,
              title: "Follow a little experience.",
              text: "Explore the ideas and creators behind different liquidity strategies.",
            },
            {
              number: "03",
              icon: Waves,
              title: "Keep your own perspective.",
              text: "See your positions, performance, and fees with a clearer view of it all.",
            },
          ].map(({ number, icon: Icon, title, text }) => (
            <article key={number}>
              <div className="ph-step-top">
                <Icon size={23} />
                <span>{number}</span>
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="ph-community" id="community">
        <div className="ph-community-art" aria-hidden="true">
          <div className="ph-community-ring" />
          <div className="ph-community-ring ring-two" />
          <div className="ph-community-mark">
            <BrandMark size={100} />
          </div>
          <span className="ph-orbit-dot dot-one">j</span>
          <span className="ph-orbit-dot dot-two">a</span>
          <span className="ph-orbit-dot dot-three">m</span>
          <span className="ph-orbit-dot dot-four">s</span>
        </div>
        <div>
          <span className="ph-section-label">IN GOOD COMPANY</span>
          <h2>
            Individual perspectives.
            <br />
            <span>Shared possibilities.</span>
          </h2>
          <p>
            For the curious first-timer. The experienced LP. And everyone
            finding their own way. There’s room for you here.
          </p>
          <button className="ph-primary" onClick={onSignUp}>
            Find your place <ArrowUpRight size={17} />
          </button>
        </div>
      </section>
      <section className="ph-faq-section" id="faqs">
        <div>
          <span className="ph-section-label">A LITTLE MORE CLARITY</span>
          <h2>
            Good questions.
            <br />
            <span>Clear answers.</span>
          </h2>
          <p>Everything starts with understanding.</p>
        </div>
        <div className="ph-faq-list">
          {questions.map(([question, answer], index) => (
            <article className={faq === index ? "is-open" : ""} key={question}>
              <button
                aria-expanded={faq === index}
                aria-controls={`ph-answer-${index}`}
                onClick={() => setFaq(faq === index ? null : index)}
              >
                {question}
                <Plus size={18} />
              </button>
              <div
                className="ph-faq-answer"
                id={`ph-answer-${index}`}
                inert={faq !== index}
              >
                <div>
                  <p>{answer}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <footer className="ph-footer">
        <a className="ph-brand" href="#" aria-label="Poolers home">
          <BrandMark size={29} />
          <span>
            poolers<span className="ph-brand-dot">.</span>
          </span>
        </a>
        <p>A new current in liquidity.</p>
        <span>© {new Date().getFullYear()} Poolers</span>
        <button
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                .matches
                ? "auto"
                : "smooth",
            })
          }
        >
          Back to top <ArrowUpRight size={14} />
        </button>
      </footer>
    </div>
  );
}

type DemoPool = {
  id: string;
  pair: string;
  symbol: string;
  quote: string;
  price: number;
  change: number;
  tvl: string;
  volume: string;
  apr: number;
  tone: string;
  category: string;
};
const DEMO_POOLS: DemoPool[] = [
  {
    id: "stonk-sol",
    pair: "STONK / SOL",
    symbol: "STONK",
    quote: "SOL",
    price: 0.07142,
    change: -3.26,
    tvl: "$1.80M",
    volume: "$9.30M",
    apr: 28.64,
    tone: "teal",
    category: "Stocks",
  },
  {
    id: "nvdax-sol",
    pair: "NVDAx / SOL",
    symbol: "NVDAx",
    quote: "SOL",
    price: 210.57,
    change: 2.8,
    tvl: "$89K",
    volume: "$85K",
    apr: 16.82,
    tone: "green",
    category: "Stocks",
  },
  {
    id: "sol-usdc",
    pair: "SOL / USDC",
    symbol: "SOL",
    quote: "USDC",
    price: 148.72,
    change: 4.28,
    tvl: "$8.42M",
    volume: "$2.14M",
    apr: 18.42,
    tone: "purple",
    category: "Crypto",
  },
  {
    id: "jup-sol",
    pair: "JUP / SOL",
    symbol: "JUP",
    quote: "SOL",
    price: 0.8642,
    change: 6.12,
    tvl: "$2.68M",
    volume: "$946K",
    apr: 26.34,
    tone: "green",
    category: "Crypto",
  },
  {
    id: "bonk-sol",
    pair: "BONK / SOL",
    symbol: "BONK",
    quote: "SOL",
    price: 0.00002468,
    change: -2.14,
    tvl: "$4.12M",
    volume: "$1.86M",
    apr: 32.76,
    tone: "orange",
    category: "Memes",
  },
  {
    id: "usdc-usdt",
    pair: "USDC / USDT",
    symbol: "USDC",
    quote: "USDT",
    price: 1.0002,
    change: 0.02,
    tvl: "$12.64M",
    volume: "$4.21M",
    apr: 8.64,
    tone: "blue",
    category: "Crypto",
  },
  {
    id: "ray-sol",
    pair: "RAY / SOL",
    symbol: "RAY",
    quote: "SOL",
    price: 2.184,
    change: 3.86,
    tvl: "$3.24M",
    volume: "$728K",
    apr: 21.48,
    tone: "pink",
    category: "Crypto",
  },
  {
    id: "jitosol-sol",
    pair: "JitoSOL / SOL",
    symbol: "JitoSOL",
    quote: "SOL",
    price: 172.46,
    change: 1.72,
    tvl: "$6.18M",
    volume: "$512K",
    apr: 12.86,
    tone: "teal",
    category: "Crypto",
  },
];
type DemoToken = "USDC" | "SOL";
type DemoPosition = {
  id: string;
  poolId: string;
  title: string;
  units: number;
  usd: number;
  token: DemoToken;
  kind: "created" | "joined";
  shape: string;
  fee: number;
  min: number;
  max: number;
  status: "active" | "closed";
  date: string;
};
type DemoEvent = {
  id: string;
  action: string;
  detail: string;
  amount: number;
  token: DemoToken;
  date: string;
};
type DemoWorkspace = {
  version: 1;
  connected: boolean;
  balances: { USDC: number; SOL: number };
  positions: DemoPosition[];
  events: DemoEvent[];
  profile: { name: string; handle: string; bio: string };
  following: string[];
};
type DemoStrategy = {
  id: string;
  poolId: string;
  title: string;
  creator: string;
  initials: string;
  tone: string;
  apr: number;
  members: number;
  shape: string;
};
const DEMO_STRATEGIES: DemoStrategy[] = [
  {
    id: "steady",
    poolId: "sol-usdc",
    title: "A steady kind of growth",
    creator: "marin.lp",
    initials: "M",
    tone: "teal",
    apr: 18.42,
    members: 128,
    shape: "Spot",
  },
  {
    id: "balanced",
    poolId: "sol-usdc",
    title: "Find the middle ground",
    creator: "alex.sol",
    initials: "A",
    tone: "purple",
    apr: 21.68,
    members: 86,
    shape: "Curve",
  },
  {
    id: "current",
    poolId: "jup-sol",
    title: "Follow the current",
    creator: "jules.lp",
    initials: "J",
    tone: "orange",
    apr: 26.34,
    members: 64,
    shape: "Bid Ask",
  },
  {
    id: "stable",
    poolId: "usdc-usdt",
    title: "Slow and steady",
    creator: "marin.lp",
    initials: "M",
    tone: "teal",
    apr: 8.64,
    members: 214,
    shape: "Curve",
  },
  {
    id: "wide",
    poolId: "ray-sol",
    title: "A wider perspective",
    creator: "alex.sol",
    initials: "A",
    tone: "purple",
    apr: 21.48,
    members: 42,
    shape: "Spot",
  },
];
const DEMO_STORAGE_KEY = "poolers.premium.workspace.v1";
function newDemoWorkspace(): DemoWorkspace {
  return {
    version: 1,
    connected: false,
    balances: { USDC: 10000, SOL: 12.5 },
    positions: [
      {
        id: "initial-1",
        poolId: "sol-usdc",
        title: "My balanced perspective",
        units: 2400,
        usd: 2400,
        token: "USDC",
        kind: "created",
        shape: "Spot",
        fee: 10,
        min: -8,
        max: 8,
        status: "active",
        date: "2026-11-06T08:00:00Z",
      },
      {
        id: "initial-2",
        poolId: "jup-sol",
        title: "Follow the current",
        units: 800,
        usd: 800,
        token: "USDC",
        kind: "joined",
        shape: "Bid Ask",
        fee: 10,
        min: -12,
        max: 12,
        status: "active",
        date: "2026-11-05T10:00:00Z",
      },
    ],
    events: [
      {
        id: "seed",
        action: "Joined strategy",
        detail: "Follow the current · JUP / SOL",
        amount: 800,
        token: "USDC",
        date: "2026-11-05T10:00:00Z",
      },
    ],
    profile: {
      name: "Jamie Carter",
      handle: "jamie.lp",
      bio: "Finding my flow. One thoughtful position at a time.",
    },
    following: ["marin.lp"],
  };
}
function readDemoWorkspace(): DemoWorkspace {
  try {
    const value = JSON.parse(localStorage.getItem(DEMO_STORAGE_KEY) || "null");
    if (
      value?.version === 1 &&
      typeof value.connected === "boolean" &&
      typeof value.profile?.name === "string" &&
      typeof value.profile?.handle === "string" &&
      typeof value.profile?.bio === "string" &&
      ["USDC", "SOL"].every(
        (token) =>
          Number.isFinite(value.balances?.[token]) &&
          value.balances[token] >= 0,
      ) &&
      Array.isArray(value.positions) &&
      value.positions.length < 500 &&
      value.positions.every(
        (p: DemoPosition) =>
          DEMO_POOLS.some((pool) => pool.id === p.poolId) &&
          Number.isFinite(p.usd) &&
          Number.isFinite(p.units) &&
          ["USDC", "SOL"].includes(p.token) &&
          ["active", "closed"].includes(p.status) &&
          typeof p.title === "string",
      ) &&
      Array.isArray(value.events) &&
      value.events.length < 1000 &&
      Array.isArray(value.following)
    )
      return value;
  } catch {
    /* A new demo can always start without browser storage. */
  }
  return newDemoWorkspace();
}
function demoMoney(value: number, digits = 2) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}
function demoPrice(value: number) {
  return "$" + demoMoney(value, value < 0.01 ? 8 : value < 10 ? 4 : 2);
}
function demoRound(value: number) {
  return Math.round(value * 1000000) / 1000000;
}
type TerminalModal =
  | null
  | { kind: "wallet" | "review" | "edit" | "reset" }
  | { kind: "join"; strategy: DemoStrategy }
  | { kind: "creator"; handle: string }
  | { kind: "fund"; direction: "Deposit" | "Withdraw" }
  | { kind: "exit"; id: string };

function PoolersTerminal({
  onHome,
  onOnboarding,
}: {
  onHome: () => void;
  onOnboarding: () => void;
}) {
  const [workspace, setWorkspace] = useState<DemoWorkspace>(readDemoWorkspace);
  const [view, setView] = useState<"terminal" | "portfolio" | "profile">(() =>
    window.location.pathname.includes("portfolio")
      ? "portfolio"
      : window.location.pathname.endsWith("/profile")
        ? "profile"
        : "terminal",
  );
  const [selectedId, setSelectedId] = useState("sol-usdc");
  const [discovery, setDiscovery] = useState("Pools");
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [timeframe, setTimeframe] = useState("1H");
  const [marketTab, setMarketTab] = useState("Chart");
  const [activityTab, setActivityTab] = useState("Strategies");
  const [profileTab, setProfileTab] = useState("All positions");
  const [shape, setShape] = useState("Spot");
  const [fundingToken, setFundingToken] = useState<DemoToken>("USDC");
  const [amount, setAmount] = useState("1000");
  const [minRange, setMinRange] = useState(-8);
  const [maxRange, setMaxRange] = useState(8);
  const [creatorFee, setCreatorFee] = useState(10);
  const [modal, setModal] = useState<TerminalModal>(null);
  const [modalAmount, setModalAmount] = useState("250");
  const [editName, setEditName] = useState("");
  const [editHandle, setEditHandle] = useState("");
  const [editBio, setEditBio] = useState("");
  const [toast, setToast] = useState("");
  const [mobilePanel, setMobilePanel] = useState("Market");
  const [hoveredCandle, setHoveredCandle] = useState<number | null>(null);
  const [positionFilter, setPositionFilter] = useState("All");
  const searchRef = useRef<HTMLInputElement>(null);
  const pendingWalletAction = useRef<TerminalModal>(null);
  const pool = DEMO_POOLS.find((item) => item.id === selectedId)!;
  const filteredPools = DEMO_POOLS.filter(
    (item) =>
      (category === "All" || item.category === category) &&
      `${item.pair} ${item.symbol}`.toLowerCase().includes(query.toLowerCase()),
  );
  const activePositions = workspace.positions.filter(
    (position) => position.status === "active",
  );
  const activeUsd = activePositions.reduce(
    (total, position) => total + position.usd,
    0,
  );
  const walletUsd =
    workspace.balances.USDC +
    workspace.balances.SOL *
      DEMO_POOLS.find((item) => item.id === "sol-usdc")!.price;
  const totalUsd = walletUsd + activeUsd;
  const usdAmount =
    Number(amount) *
    (fundingToken === "SOL"
      ? DEMO_POOLS.find((item) => item.id === "sol-usdc")!.price
      : 1);
  const amountValid =
    amount.trim() !== "" &&
    Number.isFinite(Number(amount)) &&
    Number(amount) > 0 &&
    Number(amount) <= workspace.balances[fundingToken];
  const selectedStrategies = DEMO_STRATEGIES.filter(
    (strategy) => strategy.poolId === selectedId,
  );
  const modalValue = Number(modalAmount);
  const modalValueValid =
    modalAmount.trim() !== "" &&
    Number.isFinite(modalValue) &&
    modalValue > 0 &&
    modalValue <= 1000000 &&
    ((modal?.kind !== "join" &&
      !(modal?.kind === "fund" && modal.direction === "Withdraw")) ||
      modalValue <= workspace.balances.USDC);
  useEffect(() => {
    try {
      localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(workspace));
    } catch {
      /* In-memory mode remains usable. */
    }
  }, [workspace]);
  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(""), 4800);
    return () => window.clearTimeout(timeout);
  }, [toast]);
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, []);
  const notify = (message: string) => setToast(message);
  const selectPool = (id: string) => {
    setSelectedId(id);
    setView("terminal");
    setMarketTab("Chart");
    setHoveredCandle(null);
    setMobilePanel("Market");
  };
  const connectDemo = () => {
    setWorkspace((current) => ({ ...current, connected: true }));
    setModal(pendingWalletAction.current);
    pendingWalletAction.current = null;
    notify("Demo wallet ready. Your workspace is yours to explore.");
  };
  const eventRecord = (
    action: string,
    detail: string,
    units: number,
    token: DemoToken,
  ): DemoEvent => ({
    id: crypto.randomUUID(),
    action,
    detail,
    amount: units,
    token,
    date: new Date().toISOString(),
  });
  const createStrategy = () => {
    if (!amountValid || !workspace.connected) return;
    const units = Number(amount);
    const position: DemoPosition = {
      id: crypto.randomUUID(),
      poolId: selectedId,
      title: `${pool.symbol}, my way`,
      units,
      usd: usdAmount,
      token: fundingToken,
      kind: "created",
      shape,
      fee: creatorFee,
      min: minRange,
      max: maxRange,
      status: "active",
      date: new Date().toISOString(),
    };
    setWorkspace((current) => ({
      ...current,
      balances: {
        ...current.balances,
        [fundingToken]: demoRound(current.balances[fundingToken] - units),
      },
      positions: [position, ...current.positions],
      events: [
        eventRecord("Created strategy", pool.pair, units, fundingToken),
        ...current.events,
      ].slice(0, 500),
    }));
    setModal(null);
    setActivityTab("Yours");
    setMobilePanel("Market");
    notify("Strategy created. You can manage it in your portfolio.");
  };
  const joinStrategy = (strategy: DemoStrategy) => {
    if (!modalValueValid || !workspace.connected) return;
    const position: DemoPosition = {
      id: crypto.randomUUID(),
      poolId: strategy.poolId,
      title: strategy.title,
      units: modalValue,
      usd: modalValue,
      token: "USDC",
      kind: "joined",
      shape: strategy.shape,
      fee: 10,
      min: -8,
      max: 8,
      status: "active",
      date: new Date().toISOString(),
    };
    setWorkspace((current) => ({
      ...current,
      balances: {
        ...current.balances,
        USDC: demoRound(current.balances.USDC - modalValue),
      },
      positions: [position, ...current.positions],
      events: [
        eventRecord("Joined strategy", strategy.title, modalValue, "USDC"),
        ...current.events,
      ].slice(0, 500),
    }));
    setModal(null);
    notify("You joined the strategy. Find your position in Portfolio.");
  };
  const exitPosition = (id: string) => {
    const position = workspace.positions.find(
      (item) => item.id === id && item.status === "active",
    );
    if (!position) return;
    setWorkspace((current) => ({
      ...current,
      balances: {
        ...current.balances,
        [position.token]: demoRound(
          current.balances[position.token] + position.units,
        ),
      },
      positions: current.positions.map((item) =>
        item.id === id ? { ...item, status: "closed" } : item,
      ),
      events: [
        eventRecord(
          position.kind === "created" ? "Closed strategy" : "Exited strategy",
          position.title,
          position.units,
          position.token,
        ),
        ...current.events,
      ].slice(0, 500),
    }));
    setModal(null);
    notify("Position closed. Your demo funds are back in your wallet.");
  };
  const transferFunds = (direction: "Deposit" | "Withdraw") => {
    if (!modalValueValid) return;
    setWorkspace((current) => ({
      ...current,
      connected: true,
      balances: {
        ...current.balances,
        USDC: demoRound(
          current.balances.USDC +
            (direction === "Deposit" ? modalValue : -modalValue),
        ),
      },
      events: [
        eventRecord(
          direction === "Deposit" ? "Demo deposit" : "Demo withdrawal",
          "Demo wallet",
          modalValue,
          "USDC",
        ),
        ...current.events,
      ].slice(0, 500),
    }));
    setModal(null);
    notify(
      `${demoMoney(modalValue)} USDC ${direction === "Deposit" ? "added to" : "removed from"} your demo balance.`,
    );
  };
  const openJoin = (strategy: DemoStrategy) => {
    setModalAmount("250");
    if (!workspace.connected)
      pendingWalletAction.current = { kind: "join", strategy };
    setModal(
      workspace.connected ? { kind: "join", strategy } : { kind: "wallet" },
    );
  };
  const openComposer = () => {
    setMobilePanel("Create");
    window.requestAnimationFrame(() =>
      document.getElementById("strategy-amount")?.focus(),
    );
  };
  const openFund = (direction: "Deposit" | "Withdraw") => {
    setModalAmount("500");
    setModal({ kind: "fund", direction });
  };
  const followCreator = (handle: string) =>
    setWorkspace((current) => ({
      ...current,
      following: current.following.includes(handle)
        ? current.following.filter((item) => item !== handle)
        : [...current.following, handle],
    }));
  const renderPosition = (position: DemoPosition) => {
    const positionPool = DEMO_POOLS.find(
      (item) => item.id === position.poolId,
    )!;
    return (
      <div className="pt-position-row" key={position.id}>
        <button
          className="pt-position-name"
          onClick={() => selectPool(position.poolId)}
        >
          <TokenPair pool={positionPool} />
          <span>
            <strong>{position.title}</strong>
            <small>
              {positionPool.pair} · {position.shape}
            </small>
          </span>
        </button>
        <div>
          <strong>${demoMoney(position.usd)}</strong>
          <small>
            {position.kind === "created"
              ? "Created by you"
              : "Following a creator"}
          </small>
        </div>
        <span
          className={`pt-range-chip ${position.status === "closed" ? "closed" : ""}`}
        >
          {position.status === "active" ? "In range" : "Closed"}
        </span>
        <button
          className="pt-small-button"
          disabled={position.status === "closed"}
          onClick={() => setModal({ kind: "exit", id: position.id })}
        >
          {position.status === "closed"
            ? "Closed"
            : position.kind === "created"
              ? "Close"
              : "Exit"}
          <ArrowUpRight size={12} />
        </button>
      </div>
    );
  };
  return (
    <div className="pt-app">
      <header className="pt-topbar">
        <button className="pt-brand" onClick={onHome} aria-label="Poolers home">
          <BrandMark size={37} />
          <span>
            poolers<span>.</span>
          </span>
        </button>
        <nav aria-label="Application navigation">
          <button
            className={view === "terminal" ? "active" : ""}
            onClick={() => setView("terminal")}
          >
            <Waves size={16} />
            Explore
          </button>
          <button
            className={view === "portfolio" ? "active" : ""}
            onClick={() => setView("portfolio")}
          >
            <Wallet size={15} />
            Portfolio
          </button>
        </nav>
        <label className="pt-global-search">
          <Search size={15} />
          <input
            ref={searchRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setView("terminal");
              setMobilePanel("Discover");
            }}
            placeholder="Search pools, tokens…"
            aria-label="Search all pools"
          />
          <kbd>⌘ K</kbd>
        </label>
        <span className="pt-demo-badge">
          <span />
          INTERACTIVE DEMO
        </span>
        <button
          className="pt-wallet-button"
          onClick={() => {
            pendingWalletAction.current = null;
            workspace.connected
              ? openFund("Deposit")
              : setModal({ kind: "wallet" });
          }}
        >
          <Wallet size={15} />
          {workspace.connected
            ? `${demoMoney(walletUsd)} USD`
            : "Try demo wallet"}
          {workspace.connected && <ChevronDown size={13} />}
        </button>
        <button
          className={`pt-avatar ${view === "profile" ? "active" : ""}`}
          onClick={() => setView("profile")}
          aria-label="Open your profile"
        >
          {workspace.profile.name
            .split(" ")
            .map((word) => word[0])
            .slice(0, 2)
            .join("")}
        </button>
      </header>
      <div className="pt-demo-strip">
        <span>
          <span className="pt-live-dot" />A little clarity. A lot more
          possibility.
        </span>
        <span>Sample markets · simulated actions · no real funds</span>
        <button onClick={() => setModal({ kind: "reset" })}>
          Reset demo <RotateCcw size={11} />
        </button>
      </div>
      {view === "terminal" ? (
        <>
          <div className="pt-mobile-tabs" aria-label="Workspace panel">
            {["Discover", "Market", "Create"].map((panel) => (
              <button
                key={panel}
                className={mobilePanel === panel ? "active" : ""}
                onClick={() => setMobilePanel(panel)}
              >
                {panel === "Discover" ? (
                  <Compass size={15} />
                ) : panel === "Market" ? (
                  <ChartNoAxesCombined size={15} />
                ) : (
                  <Plus size={15} />
                )}{" "}
                {panel}
              </button>
            ))}
          </div>
          <div className={`pt-workspace show-${mobilePanel.toLowerCase()}`}>
            <aside className="pt-discovery">
              <div className="pt-side-heading">
                <div>
                  <span className="pt-eyebrow">FIND YOUR CURRENT</span>
                  <h1>Discover</h1>
                </div>
                <button
                  className="pt-icon-button"
                  onClick={() => {
                    setQuery("");
                    setCategory("All");
                    notify("Showing all demo markets.");
                  }}
                  aria-label="Reset discovery filters"
                >
                  <SlidersHorizontal size={16} />
                </button>
              </div>
              <label className="pt-discover-search">
                <Search size={15} />
                <input
                  aria-label="Search mobile pools"
                  placeholder="Pools, tokens, creators…"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </label>
              <div className="pt-discovery-tabs">
                {["Strategies", "Pools"].map((tab) => (
                  <button
                    key={tab}
                    className={discovery === tab ? "active" : ""}
                    onClick={() => setDiscovery(tab)}
                  >
                    {tab}
                    {tab === "Pools" && <span>{DEMO_POOLS.length}</span>}
                  </button>
                ))}
              </div>
              {discovery === "Pools" ? (
                <>
                  <div className="pt-categories">
                    {["All", "Crypto", "Memes", "Stocks"].map((item) => (
                      <button
                        key={item}
                        className={category === item ? "active" : ""}
                        onClick={() => setCategory(item)}
                      >
                        {item === "Memes" && <Flame size={11} />} {item}
                      </button>
                    ))}
                  </div>
                  <div className="pt-pool-list">
                    {filteredPools.map((item) => (
                      <button
                        className={`pt-pool-card ${selectedId === item.id ? "active" : ""}`}
                        key={item.id}
                        onClick={() => selectPool(item.id)}
                        aria-label={`${item.pair} pool`}
                        aria-pressed={selectedId === item.id}
                      >
                        <TokenPair pool={item} />
                        <div>
                          <strong>{item.pair}</strong>
                          <span>{demoPrice(item.price)}</span>
                        </div>
                        <div>
                          <strong
                            className={
                              item.change < 0 ? "negative" : "positive"
                            }
                          >
                            {item.change > 0 ? "+" : ""}
                            {demoMoney(item.change)}%
                          </strong>
                          <span>{item.tvl} TVL</span>
                        </div>
                      </button>
                    ))}
                    {!filteredPools.length && (
                      <div className="pt-empty">
                        <Search size={23} />
                        <strong>No pools found</strong>
                        <p>Try another token or clear your filters.</p>
                        <button
                          onClick={() => {
                            setQuery("");
                            setCategory("All");
                          }}
                        >
                          Clear filters
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="pt-creator-list">
                  <p>Good ideas come from good company.</p>
                  {["marin.lp", "alex.sol", "jules.lp"].map(
                    (creator, index) => (
                      <article key={creator}>
                        <span
                          className={`pt-creator-avatar tone-${["teal", "purple", "orange"][index]}`}
                        >
                          {creator[0].toUpperCase()}
                        </span>
                        <div>
                          <button
                            className="pt-creator-link"
                            onClick={() =>
                              setModal({ kind: "creator", handle: creator })
                            }
                            aria-label={`View ${creator} profile`}
                          >
                            {creator}
                          </button>
                          <span>
                            {[12, 8, 6][index]} strategies · {214 - index * 46}{" "}
                            followers
                          </span>
                        </div>
                        <button
                          onClick={() => followCreator(creator)}
                          aria-label={`${workspace.following.includes(creator) ? "Unfollow" : "Follow"} ${creator}`}
                          className={
                            workspace.following.includes(creator)
                              ? "following"
                              : ""
                          }
                        >
                          {workspace.following.includes(creator) ? (
                            <Check size={13} />
                          ) : (
                            <Plus size={13} />
                          )}
                        </button>
                      </article>
                    ),
                  )}
                  <div className="pt-curated-list">
                    {DEMO_STRATEGIES.filter((item) =>
                      `${item.title} ${item.creator} ${DEMO_POOLS.find((p) => p.id === item.poolId)?.pair}`
                        .toLowerCase()
                        .includes(query.toLowerCase()),
                    ).map((strategy) => (
                      <button
                        key={strategy.id}
                        onClick={() => {
                          selectPool(strategy.poolId);
                          setActivityTab("Strategies");
                        }}
                      >
                        <span>
                          {strategy.title}
                          <small>by {strategy.creator}</small>
                        </span>
                        <strong>
                          {strategy.apr}%<small>est. APR</small>
                        </strong>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="pt-discovery-bottom">
                <span className="pt-status-row">
                  <span />
                  Solana-inspired workspace <span>DEMO</span>
                </span>
                <button onClick={onOnboarding}>
                  <Sparkles size={15} />
                  <span>
                    Make yourself at home
                    <small>Explore the onboarding experience</small>
                  </span>
                  <ArrowUpRight size={13} />
                </button>
              </div>
            </aside>
            <main className="pt-market">
              <div className="pt-market-header">
                <div className="pt-market-pair">
                  <TokenPair pool={pool} />
                  <div>
                    <h2>
                      {pool.pair}
                      <span>DLMM</span>
                    </h2>
                    <p>
                      Concentrated liquidity <span>·</span> 0.30% fee{" "}
                      <span>·</span> 20 bin step
                    </p>
                  </div>
                  <button
                    className="pt-icon-button"
                    aria-label="Copy demo pool reference"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(`demo:${pool.id}`);
                        notify("Demo pool reference copied.");
                      } catch {
                        notify(`Demo pool reference: ${pool.id}`);
                      }
                    }}
                  >
                    <Copy size={13} />
                  </button>
                </div>
                <div className="pt-market-price">
                  <strong>{demoPrice(pool.price)}</strong>
                  <span className={pool.change < 0 ? "negative" : "positive"}>
                    {pool.change > 0 ? "+" : ""}
                    {pool.change}% <small>24h</small>
                  </span>
                </div>
              </div>
              <div className="pt-market-metrics">
                <div>
                  <span>Liquidity</span>
                  <strong>{pool.tvl}</strong>
                </div>
                <div>
                  <span>24h volume</span>
                  <strong>{pool.volume}</strong>
                </div>
                <div>
                  <span>Est. pool APR</span>
                  <strong className="positive">{pool.apr}%</strong>
                </div>
                <div>
                  <span>Fee tier</span>
                  <strong>
                    0.30%<small>Dynamic</small>
                  </strong>
                </div>
              </div>
              <section className="pt-chart-section">
                <div className="pt-chart-toolbar">
                  <div className="pt-line-tabs">
                    {["Chart", "Details"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setMarketTab(tab)}
                        className={marketTab === tab ? "active" : ""}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  <div className="pt-chart-timeframes">
                    {["15m", "1H", "4H", "1D"].map((period) => (
                      <button
                        key={period}
                        aria-pressed={timeframe === period}
                        className={timeframe === period ? "active" : ""}
                        onClick={() => {
                          setTimeframe(period);
                          setHoveredCandle(null);
                        }}
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                </div>
                {marketTab === "Chart" ? (
                  <>
                    <MarketCandles
                      pool={pool}
                      timeframe={timeframe}
                      hovered={hoveredCandle}
                      onHover={setHoveredCandle}
                    />
                    <div className="pt-chart-caption">
                      <span>
                        <span className="pt-legend-dot" />
                        Price / USD
                      </span>
                      <span>
                        <span className="pt-legend-dot muted" />
                        Volume
                      </span>
                      <span>Illustrative market data</span>
                    </div>
                  </>
                ) : (
                  <div className="pt-market-details">
                    <h3>A clearer look at {pool.pair}.</h3>
                    <p>
                      This concentrated liquidity pool lets LPs choose a price
                      range. Positions earn fees in this demo while the market
                      price stays within that range.
                    </p>
                    <dl>
                      <div>
                        <dt>Pool type</dt>
                        <dd>Dynamic liquidity market maker</dd>
                      </div>
                      <div>
                        <dt>Assets</dt>
                        <dd>
                          {pool.symbol} + {pool.quote}
                        </dd>
                      </div>
                      <div>
                        <dt>Bin step</dt>
                        <dd>20 basis points</dd>
                      </div>
                      <div>
                        <dt>Reference</dt>
                        <dd>demo:{pool.id}</dd>
                      </div>
                    </dl>
                    <p className="pt-details-note">
                      <ShieldCheck size={15} />
                      This workspace uses simulated data. Nothing here moves
                      real funds.
                    </p>
                  </div>
                )}
              </section>
              <section className="pt-activity-section">
                <div className="pt-activity-header">
                  <div className="pt-line-tabs">
                    {["Strategies", "Yours", "History", "Liquidity"].map(
                      (tab) => (
                        <button
                          key={tab}
                          className={activityTab === tab ? "active" : ""}
                          onClick={() => setActivityTab(tab)}
                        >
                          {tab}
                          {tab === "Yours" && (
                            <span>
                              {
                                activePositions.filter(
                                  (item) => item.poolId === selectedId,
                                ).length
                              }
                            </span>
                          )}
                        </button>
                      ),
                    )}
                  </div>
                  <span className="pt-sample-label">SAMPLE DATA</span>
                </div>
                {activityTab === "Strategies" ? (
                  <>
                    <div className="pt-strategy-intro">
                      <span>Thoughtful strategies. Shared perspectives.</span>
                      <button onClick={openComposer}>
                        Create yours <ArrowUpRight size={12} />
                      </button>
                    </div>
                    <div className="pt-strategy-list">
                      {selectedStrategies.length ? (
                        selectedStrategies.map((strategy) => (
                          <article
                            className="pt-strategy-card"
                            key={strategy.id}
                          >
                            <span
                              className={`pt-creator-avatar tone-${strategy.tone}`}
                            >
                              {strategy.initials}
                            </span>
                            <div>
                              <h3>{strategy.title}</h3>
                              <p>
                                by{" "}
                                <button
                                  className="pt-creator-link"
                                  onClick={() =>
                                    setModal({
                                      kind: "creator",
                                      handle: strategy.creator,
                                    })
                                  }
                                >
                                  {strategy.creator}
                                </button>
                                <span>·</span>
                                {strategy.members} LPs<span>·</span>
                                {strategy.shape}
                              </p>
                            </div>
                            <div className="pt-strategy-return">
                              <strong>{strategy.apr}%</strong>
                              <span>est. APR</span>
                            </div>
                            <button
                              className="pt-small-button"
                              onClick={() => openJoin(strategy)}
                            >
                              Join <ArrowUpRight size={13} />
                            </button>
                          </article>
                        ))
                      ) : (
                        <div className="pt-empty">
                          <Layers3 size={25} />
                          <strong>Room for a new perspective.</strong>
                          <p>
                            Be the first to create a demo strategy for this
                            pool.
                          </p>
                          <button onClick={openComposer}>
                            Create a strategy
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                ) : activityTab === "Yours" ? (
                  <div className="pt-terminal-positions">
                    {activePositions.filter(
                      (item) => item.poolId === selectedId,
                    ).length ? (
                      activePositions
                        .filter((item) => item.poolId === selectedId)
                        .map(renderPosition)
                    ) : (
                      <div className="pt-empty">
                        <Wallet size={25} />
                        <strong>Your next position starts here.</strong>
                        <p>Create or join a demo strategy to see it here.</p>
                      </div>
                    )}
                  </div>
                ) : activityTab === "History" ? (
                  <div className="pt-history-list">
                    {workspace.events.filter(
                      (event) =>
                        event.detail.includes(pool.pair) ||
                        event.detail.includes(pool.symbol) ||
                        event.action.includes("Demo"),
                    ).length ? (
                      workspace.events
                        .filter(
                          (event) =>
                            event.detail.includes(pool.pair) ||
                            event.detail.includes(pool.symbol) ||
                            event.action.includes("Demo"),
                        )
                        .slice(0, 8)
                        .map((event) => (
                          <DemoHistoryRow event={event} key={event.id} />
                        ))
                    ) : (
                      <div className="pt-empty">
                        <Clock3 size={25} />
                        <strong>A fresh start.</strong>
                        <p>
                          Your demo activity for this pool will appear here.
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="pt-liquidity-view">
                    <div>
                      <h3>A little depth. A little perspective.</h3>
                      <p>
                        Illustrative liquidity distribution across the price
                        range.
                      </p>
                    </div>
                    <LiquidityBars shape={shape} large />
                    <div className="pt-liquidity-labels">
                      <span>Lower price</span>
                      <span>Current price</span>
                      <span>Higher price</span>
                    </div>
                  </div>
                )}
              </section>
            </main>
            <aside className="pt-composer">
              <div className="pt-composer-title">
                <span className="pt-composer-symbol">
                  <Plus size={18} />
                </span>
                <div>
                  <h2>Create a strategy</h2>
                  <p>A position with your perspective.</p>
                </div>
              </div>
              <div className="pt-field-heading">
                <label htmlFor="strategy-amount">Your starting point</label>
                <span>DEMO FUNDS</span>
              </div>
              <div className="pt-amount-box">
                <div>
                  <select
                    aria-label="Funding asset"
                    value={fundingToken}
                    onChange={(event) =>
                      setFundingToken(event.target.value as DemoToken)
                    }
                  >
                    <option>USDC</option>
                    <option>SOL</option>
                  </select>
                  <span>
                    ${demoMoney(Number.isFinite(usdAmount) ? usdAmount : 0)}
                  </span>
                </div>
                <input
                  id="strategy-amount"
                  aria-label="Strategy amount"
                  inputMode="decimal"
                  type="number"
                  min="0"
                  max={workspace.balances[fundingToken]}
                  step="any"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                />
                <div className="pt-available">
                  Available: {demoMoney(workspace.balances[fundingToken])}{" "}
                  {fundingToken}
                  <button
                    onClick={() =>
                      setAmount(String(workspace.balances[fundingToken]))
                    }
                  >
                    Max
                  </button>
                </div>
              </div>
              {!amountValid && (
                <p className="pt-field-error" role="status">
                  Enter an amount within your available demo balance.
                </p>
              )}
              <div className="pt-field-heading">
                <span>Find your shape</span>
                <CircleHelp
                  size={13}
                  aria-label="Distribution across your selected range"
                />
              </div>
              <div className="pt-shape-picker">
                {["Spot", "Curve", "Bid Ask"].map((item) => (
                  <button
                    key={item}
                    onClick={() => setShape(item)}
                    className={shape === item ? "active" : ""}
                    aria-pressed={shape === item}
                  >
                    <ShapeIcon shape={item} />
                    {item}
                  </button>
                ))}
              </div>
              <div className="pt-field-heading pt-range-heading">
                <span>Price range</span>
                <button
                  onClick={() => {
                    setMinRange(-8);
                    setMaxRange(8);
                  }}
                  aria-label="Reset price range"
                >
                  <RotateCcw size={12} />
                </button>
              </div>
              <LiquidityBars shape={shape} />
              <div className="pt-range-fields">
                <label>
                  Min. price
                  <span>{demoPrice(pool.price * (1 + minRange / 100))}</span>
                  <div>
                    <input
                      aria-label="Minimum range percent"
                      type="number"
                      min="-50"
                      max="-1"
                      value={minRange}
                      onChange={(event) =>
                        setMinRange(
                          Math.min(
                            -1,
                            Math.max(-50, Number(event.target.value)),
                          ),
                        )
                      }
                    />
                    <span>%</span>
                  </div>
                </label>
                <label>
                  Max. price
                  <span>{demoPrice(pool.price * (1 + maxRange / 100))}</span>
                  <div>
                    <input
                      aria-label="Maximum range percent"
                      type="number"
                      min="1"
                      max="50"
                      value={maxRange}
                      onChange={(event) =>
                        setMaxRange(
                          Math.max(1, Math.min(50, Number(event.target.value))),
                        )
                      }
                    />
                    <span>%</span>
                  </div>
                </label>
              </div>
              <div className="pt-range-slider">
                <input
                  aria-label="Lower price range"
                  type="range"
                  min="-50"
                  max="-1"
                  value={minRange}
                  onChange={(event) => setMinRange(Number(event.target.value))}
                />
                <input
                  aria-label="Upper price range"
                  type="range"
                  min="1"
                  max="50"
                  value={maxRange}
                  onChange={(event) => setMaxRange(Number(event.target.value))}
                />
              </div>
              <div className="pt-field-heading">
                <span>Creator fee</span>
                <strong>{creatorFee}%</strong>
              </div>
              <input
                className="pt-fee-slider"
                aria-label="Creator fee percent"
                type="range"
                min="5"
                max="25"
                value={creatorFee}
                onChange={(event) => setCreatorFee(Number(event.target.value))}
              />
              <p className="pt-creator-help">
                Your share of followers’ simulated strategy profits.
              </p>
              <div className="pt-composer-summary">
                <div>
                  <span>Distribution</span>
                  <strong>
                    50% {pool.symbol} / 50% {pool.quote}
                  </strong>
                </div>
                <div>
                  <span>Selected range</span>
                  <strong>
                    {minRange}% to +{maxRange}%
                  </strong>
                </div>
                <div>
                  <span>Network</span>
                  <strong>
                    <span className="pt-live-dot" />
                    Demo environment
                  </strong>
                </div>
              </div>
              <button
                className="pt-primary pt-create-button"
                disabled={workspace.connected && !amountValid}
                onClick={() => {
                  if (!workspace.connected)
                    pendingWalletAction.current = amountValid
                      ? { kind: "review" }
                      : null;
                  setModal(
                    workspace.connected
                      ? { kind: "review" }
                      : { kind: "wallet" },
                  );
                }}
              >
                {workspace.connected
                  ? "Preview strategy"
                  : "Start with a demo wallet"}
                <ArrowRight size={16} />
              </button>
              <p className="pt-composer-note">
                <ShieldCheck size={12} />
                No wallet connection. No real transactions.
              </p>
            </aside>
          </div>
        </>
      ) : (
        <main className="pt-account-page">
          <div className="pt-account-header">
            <div>
              <span className="pt-eyebrow">YOUR OWN PERSPECTIVE</span>
              <h1>
                {view === "portfolio"
                  ? "Your liquidity, in focus."
                  : workspace.profile.name}
                <span>✳</span>
              </h1>
              <p>
                {view === "portfolio"
                  ? "Your positions, your balance, your next move."
                  : `@${workspace.profile.handle} · ${workspace.profile.bio}`}
              </p>
            </div>
            <div className="pt-account-actions">
              {view === "portfolio" ? (
                <>
                  <button
                    className="pt-secondary-button"
                    onClick={() => openFund("Withdraw")}
                  >
                    <ArrowUpRight size={15} />
                    Withdraw
                  </button>
                  <button
                    className="pt-primary"
                    onClick={() => openFund("Deposit")}
                  >
                    <Plus size={15} />
                    Deposit demo funds
                  </button>
                </>
              ) : (
                <button
                  className="pt-secondary-button"
                  onClick={() => {
                    setEditName(workspace.profile.name);
                    setEditHandle(workspace.profile.handle);
                    setEditBio(workspace.profile.bio);
                    setModal({ kind: "edit" });
                  }}
                >
                  <Pencil size={14} />
                  Edit profile
                </button>
              )}
            </div>
          </div>
          {!workspace.connected && (
            <div className="pt-wallet-callout">
              <Wallet size={20} />
              <div>
                <strong>A workspace you can make your own.</strong>
                <span>
                  Start the demo wallet to create, join, and manage positions.
                </span>
              </div>
              <button onClick={() => setModal({ kind: "wallet" })}>
                Try demo wallet <ArrowRight size={15} />
              </button>
            </div>
          )}
          <div className="pt-account-stats">
            <article>
              <span>Total demo value</span>
              <strong>${demoMoney(totalUsd)}</strong>
              <small>Wallet + active positions</small>
              <div className="pt-stat-mini-chart">
                <svg viewBox="0 0 150 35">
                  <path
                    d="M0 30 12 26 24 28 36 20 48 23 60 15 72 18 84 8 96 12 108 4 120 7 132 2 150 0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </article>
            <article>
              <span>Available in wallet</span>
              <strong>${demoMoney(walletUsd)}</strong>
              <small>
                {demoMoney(workspace.balances.USDC)} USDC +{" "}
                {demoMoney(workspace.balances.SOL)} SOL
              </small>
            </article>
            <article>
              <span>Active liquidity</span>
              <strong>${demoMoney(activeUsd)}</strong>
              <small>
                {activePositions.length} positions across{" "}
                {
                  new Set(activePositions.map((position) => position.poolId))
                    .size
                }{" "}
                pools
              </small>
            </article>
            <article>
              <span>
                {view === "profile" ? "Following" : "Illustrative fees / day"}
              </span>
              <strong>
                {view === "profile"
                  ? workspace.following.length
                  : `$${demoMoney(activeUsd * 0.00035)}`}
              </strong>
              <small>
                {view === "profile"
                  ? "Creators in your circle"
                  : "Demo estimate · not a real return"}
              </small>
            </article>
          </div>
          <div className="pt-account-content">
            <section className="pt-account-positions">
              <div className="pt-account-section-heading">
                <div className="pt-line-tabs">
                  {(view === "profile"
                    ? ["All positions", "Created", "Joined", "History"]
                    : ["Positions", "History"]
                  ).map((tab) => (
                    <button
                      key={tab}
                      className={
                        (view === "profile" ? profileTab : positionFilter) ===
                          tab ||
                        (view === "portfolio" &&
                          positionFilter === "All" &&
                          tab === "Positions")
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        view === "profile"
                          ? setProfileTab(tab)
                          : setPositionFilter(tab)
                      }
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setView("terminal");
                    setMobilePanel("Discover");
                  }}
                >
                  Explore pools <ArrowUpRight size={13} />
                </button>
              </div>
              {(view === "profile" ? profileTab : positionFilter) ===
              "History" ? (
                <div className="pt-account-history">
                  {workspace.events.map((event) => (
                    <DemoHistoryRow key={event.id} event={event} />
                  ))}
                  {!workspace.events.length && (
                    <div className="pt-empty">
                      <Clock3 size={24} />
                      <strong>No activity yet</strong>
                      <p>Your demo activity will appear here.</p>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {workspace.positions
                    .filter((position) =>
                      view === "profile"
                        ? profileTab === "Created"
                          ? position.kind === "created"
                          : profileTab === "Joined"
                            ? position.kind === "joined"
                            : true
                        : position.status === "active",
                    )
                    .map(renderPosition)}
                  {!workspace.positions.filter((position) =>
                    view === "profile"
                      ? profileTab === "Created"
                        ? position.kind === "created"
                        : profileTab === "Joined"
                          ? position.kind === "joined"
                          : true
                      : position.status === "active",
                  ).length && (
                    <div className="pt-empty">
                      <Layers3 size={24} />
                      <strong>Make room for your next move.</strong>
                      <p>
                        Create or join a strategy to see your positions here.
                      </p>
                      <button onClick={() => setView("terminal")}>
                        Explore pools
                      </button>
                    </div>
                  )}
                </>
              )}
            </section>
            <aside className="pt-account-side">
              <span className="pt-section-icon">
                <Users size={20} />
              </span>
              <span className="pt-eyebrow">IN GOOD COMPANY</span>
              <h2>
                A little experience.
                <br />A shared perspective.
              </h2>
              <p>Find the creators behind your next strategy.</p>
              {["marin.lp", "alex.sol", "jules.lp"].map((creator, index) => (
                <div key={creator} className="pt-follow-row">
                  <span
                    className={`pt-creator-avatar tone-${["teal", "purple", "orange"][index]}`}
                  >
                    {creator[0].toUpperCase()}
                  </span>
                  <button
                    className="pt-creator-link"
                    onClick={() =>
                      setModal({ kind: "creator", handle: creator })
                    }
                    aria-label={`View ${creator} profile`}
                  >
                    {creator}
                  </button>
                  <button onClick={() => followCreator(creator)}>
                    {workspace.following.includes(creator)
                      ? "Following"
                      : "Follow"}
                  </button>
                </div>
              ))}
            </aside>
          </div>
          <div className="pt-account-footer">
            <ShieldCheck size={14} />
            Demo changes are saved in this browser. No real wallet or funds are
            used.
            <button onClick={() => setModal({ kind: "reset" })}>
              Reset workspace
            </button>
          </div>
        </main>
      )}
      {toast && (
        <div className="pt-toast" role="status">
          <CheckCircle2 size={18} />
          <span>{toast}</span>
          <button
            onClick={() => setToast("")}
            aria-label="Dismiss notification"
          >
            <X size={14} />
          </button>
        </div>
      )}
      {modal && (
        <TerminalDialog onClose={() => setModal(null)}>
          <button
            className="pt-modal-close"
            aria-label="Close dialog"
            onClick={() => setModal(null)}
            autoFocus
          >
            <X size={19} />
          </button>
          <BrandMark size={45} />
          {modal.kind === "wallet" ? (
            <>
              <span className="pt-eyebrow">YOUR NEXT CHAPTER</span>
              <h2 id="pt-dialog-title">Make yourself at home.</h2>
              <p>
                Try every part of Poolers with a demo wallet. Explore pools,
                create strategies, and see your positions come together.
              </p>
              <div className="pt-demo-wallet-card">
                <Wallet size={23} />
                <div>
                  <strong>Poolers demo wallet</strong>
                  <span>10,000 USDC + 12.5 SOL to explore</span>
                </div>
                <span className="pt-check-round">
                  <Check size={13} />
                </span>
              </div>
              <div className="pt-modal-notice">
                <ShieldCheck size={17} />
                <span>
                  This is a simulation. No browser wallet, signatures, or real
                  funds are involved.
                </span>
              </div>
              <button className="pt-primary" onClick={connectDemo}>
                Enter demo workspace <ArrowRight size={16} />
              </button>
            </>
          ) : modal.kind === "review" ? (
            <>
              <span className="pt-eyebrow">A LITTLE PERSPECTIVE</span>
              <h2 id="pt-dialog-title">Your strategy, at a glance.</h2>
              <p>Review your demo position before making it yours.</p>
              <div className="pt-review-pair">
                <TokenPair pool={pool} />
                <strong>{pool.pair}</strong>
                <span>{shape}</span>
              </div>
              <dl className="pt-review-details">
                <div>
                  <dt>Your starting amount</dt>
                  <dd>
                    {demoMoney(Number(amount))} {fundingToken}
                  </dd>
                </div>
                <div>
                  <dt>Demo value</dt>
                  <dd>${demoMoney(usdAmount)}</dd>
                </div>
                <div>
                  <dt>Price range</dt>
                  <dd>
                    {demoPrice(pool.price * (1 + minRange / 100))} —{" "}
                    {demoPrice(pool.price * (1 + maxRange / 100))}
                  </dd>
                </div>
                <div>
                  <dt>Creator fee</dt>
                  <dd>{creatorFee}%</dd>
                </div>
                <div>
                  <dt>Allocation</dt>
                  <dd>50 / 50</dd>
                </div>
              </dl>
              <div className="pt-modal-notice">
                <ShieldCheck size={17} />
                <span>
                  Creating this strategy only updates your demo workspace.
                </span>
              </div>
              <button
                className="pt-primary"
                onClick={createStrategy}
                disabled={!amountValid}
              >
                Create demo strategy <ArrowRight size={16} />
              </button>
            </>
          ) : modal.kind === "join" ? (
            <>
              <span className="pt-eyebrow">BETTER, TOGETHER</span>
              <h2 id="pt-dialog-title">Find your place in the pool.</h2>
              <p>
                Join “{modal.strategy.title}” by {modal.strategy.creator}.
              </p>
              <label className="pt-modal-input-label">
                Your demo allocation
                <div>
                  <input
                    aria-label="Join strategy amount"
                    type="number"
                    min="0.01"
                    max={workspace.balances.USDC}
                    step="any"
                    value={modalAmount}
                    onChange={(event) => setModalAmount(event.target.value)}
                  />
                  <span>USDC</span>
                </div>
              </label>
              <span className="pt-modal-available">
                Available: {demoMoney(workspace.balances.USDC)} USDC
              </span>
              <dl className="pt-review-details">
                <div>
                  <dt>Shape</dt>
                  <dd>{modal.strategy.shape}</dd>
                </div>
                <div>
                  <dt>Creator fee</dt>
                  <dd>10% of simulated profits</dd>
                </div>
                <div>
                  <dt>LPs in this strategy</dt>
                  <dd>{modal.strategy.members}</dd>
                </div>
              </dl>
              {!modalValueValid && (
                <p className="pt-field-error">
                  Enter an amount within your available demo balance.
                </p>
              )}
              <button
                className="pt-primary"
                disabled={!modalValueValid}
                onClick={() => joinStrategy(modal.strategy)}
              >
                Join demo strategy <ArrowRight size={16} />
              </button>
            </>
          ) : modal.kind === "fund" ? (
            <>
              <span className="pt-eyebrow">KEEP YOUR OWN FLOW</span>
              <h2 id="pt-dialog-title">
                {modal.direction === "Deposit"
                  ? "A little room to explore."
                  : "Move at your own pace."}
              </h2>
              <p>
                {modal.direction === "Deposit"
                  ? "Add simulated USDC to your demo wallet."
                  : "Remove simulated USDC from your demo wallet."}
              </p>
              <label className="pt-modal-input-label">
                {modal.direction} amount
                <div>
                  <input
                    aria-label={`${modal.direction} amount`}
                    type="number"
                    min="0.01"
                    max={
                      modal.direction === "Withdraw"
                        ? workspace.balances.USDC
                        : 1000000
                    }
                    step="any"
                    value={modalAmount}
                    onChange={(event) => setModalAmount(event.target.value)}
                  />
                  <span>USDC</span>
                </div>
              </label>
              <span className="pt-modal-available">
                Current balance: {demoMoney(workspace.balances.USDC)} USDC
              </span>
              <div className="pt-quick-amounts">
                {[100, 500, 1000].map((value) => (
                  <button
                    key={value}
                    onClick={() => setModalAmount(String(value))}
                  >
                    ${value.toLocaleString()}
                  </button>
                ))}
              </div>
              <div className="pt-modal-notice">
                <ShieldCheck size={17} />
                <span>
                  Demo balance only. This does not deposit or withdraw any real
                  asset.
                </span>
              </div>
              {!modalValueValid && (
                <p className="pt-field-error">
                  Enter a valid amount
                  {modal.direction === "Withdraw"
                    ? " within your USDC balance"
                    : ""}
                  .
                </p>
              )}
              <button
                className="pt-primary"
                disabled={!modalValueValid}
                onClick={() => transferFunds(modal.direction)}
              >
                {modal.direction} demo funds <ArrowRight size={16} />
              </button>
            </>
          ) : modal.kind === "exit" ? (
            (() => {
              const position = workspace.positions.find(
                (item) => item.id === modal.id,
              );
              return position ? (
                <>
                  <span className="pt-eyebrow">YOUR NEXT MOVE</span>
                  <h2 id="pt-dialog-title">
                    {position.kind === "created"
                      ? "Close this chapter?"
                      : "Find your next current?"}
                  </h2>
                  <p>
                    Close “{position.title}” and return its simulated principal
                    to your demo wallet.
                  </p>
                  <dl className="pt-review-details">
                    <div>
                      <dt>Funds returned</dt>
                      <dd>
                        {demoMoney(position.units)} {position.token}
                      </dd>
                    </div>
                    <div>
                      <dt>Demo value</dt>
                      <dd>${demoMoney(position.usd)}</dd>
                    </div>
                  </dl>
                  <div className="pt-modal-notice">
                    <ShieldCheck size={17} />
                    <span>
                      No fees or real transactions. Your history will keep a
                      record of this demo action.
                    </span>
                  </div>
                  <button
                    className="pt-primary"
                    onClick={() => exitPosition(position.id)}
                  >
                    {position.kind === "created"
                      ? "Close demo strategy"
                      : "Exit demo strategy"}
                    <ArrowRight size={16} />
                  </button>
                </>
              ) : null;
            })()
          ) : modal.kind === "creator" ? (
            <>
              <span className="pt-eyebrow">IN GOOD COMPANY</span>
              <h2 id="pt-dialog-title">@{modal.handle}</h2>
              <p>
                A thoughtful approach to liquidity. Explore this creator’s
                sample strategies and find a perspective that fits yours.
              </p>
              <div className="pt-creator-profile-stats">
                <div>
                  <strong>
                    {modal.handle === "marin.lp"
                      ? 214
                      : modal.handle === "alex.sol"
                        ? 168
                        : 122}
                  </strong>
                  <span>followers</span>
                </div>
                <div>
                  <strong>
                    {
                      DEMO_STRATEGIES.filter(
                        (strategy) => strategy.creator === modal.handle,
                      ).length
                    }
                  </strong>
                  <span>sample strategies</span>
                </div>
                <div>
                  <strong>10%</strong>
                  <span>creator fee</span>
                </div>
              </div>
              <button
                className="pt-primary"
                onClick={() => followCreator(modal.handle)}
              >
                {workspace.following.includes(modal.handle)
                  ? "Following creator"
                  : "Follow creator"}
                {workspace.following.includes(modal.handle) ? (
                  <Check size={16} />
                ) : (
                  <Plus size={16} />
                )}
              </button>
              <div className="pt-creator-modal-strategies">
                {DEMO_STRATEGIES.filter(
                  (strategy) => strategy.creator === modal.handle,
                ).map((strategy) => (
                  <button
                    key={strategy.id}
                    onClick={() => {
                      selectPool(strategy.poolId);
                      setActivityTab("Strategies");
                      setModal(null);
                    }}
                  >
                    <span>
                      <strong>{strategy.title}</strong>
                      <small>
                        {
                          DEMO_POOLS.find((item) => item.id === strategy.poolId)
                            ?.pair
                        }{" "}
                        · {strategy.shape}
                      </small>
                    </span>
                    <span>
                      {strategy.apr}%<small>est. APR</small>
                    </span>
                    <ArrowUpRight size={14} />
                  </button>
                ))}
              </div>
            </>
          ) : modal.kind === "edit" ? (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setWorkspace((current) => ({
                  ...current,
                  profile: {
                    name: editName.trim(),
                    handle: editHandle.trim().toLowerCase(),
                    bio: editBio.trim(),
                  },
                }));
                setModal(null);
                notify("Your demo profile has a fresh perspective.");
              }}
            >
              <span className="pt-eyebrow">MAKE IT YOURS</span>
              <h2 id="pt-dialog-title">A familiar face.</h2>
              <p>Personalize your demo profile.</p>
              <label className="pt-edit-field">
                Display name
                <input
                  required
                  minLength={2}
                  maxLength={40}
                  pattern=".*\S.*"
                  value={editName}
                  onChange={(event) => setEditName(event.target.value)}
                />
              </label>
              <label className="pt-edit-field">
                Handle
                <input
                  required
                  minLength={3}
                  maxLength={24}
                  pattern="[a-zA-Z0-9._]+"
                  title="Letters, numbers, dots and underscores"
                  value={editHandle}
                  onChange={(event) => setEditHandle(event.target.value)}
                />
              </label>
              <label className="pt-edit-field">
                A little about you
                <textarea
                  maxLength={140}
                  value={editBio}
                  onChange={(event) => setEditBio(event.target.value)}
                />
              </label>
              <button className="pt-primary" type="submit">
                Save demo profile <Check size={16} />
              </button>
            </form>
          ) : (
            <>
              <span className="pt-eyebrow">A FRESH PERSPECTIVE</span>
              <h2 id="pt-dialog-title">Start a new chapter?</h2>
              <p>
                This resets only your demo positions, balances, activity, and
                profile in this browser.
              </p>
              <button
                className="pt-primary"
                onClick={() => {
                  setWorkspace(newDemoWorkspace());
                  setModal(null);
                  setView("terminal");
                  notify("Your demo workspace is back to a fresh start.");
                }}
              >
                Reset demo workspace <RotateCcw size={16} />
              </button>
              <button
                className="pt-modal-cancel"
                onClick={() => setModal(null)}
              >
                Keep exploring
              </button>
            </>
          )}
        </TerminalDialog>
      )}
    </div>
  );
}

function TerminalDialog({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    const opener =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog?.showModal();
    return () => {
      dialog?.close();
      document.body.style.overflow = overflow;
      opener?.focus({ preventScroll: true });
    };
  }, []);
  return (
    <dialog
      className="pt-dialog"
      ref={ref}
      aria-labelledby="pt-dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="pt-dialog-content">{children}</div>
    </dialog>
  );
}
function TokenPair({ pool }: { pool: DemoPool }) {
  return (
    <span className={`pt-token-pair tone-${pool.tone}`} aria-hidden="true">
      <span>{pool.symbol === "SOL" ? "≋" : pool.symbol.slice(0, 1)}</span>
      <span>{pool.quote === "SOL" ? "≋" : "$"}</span>
    </span>
  );
}
function ShapeIcon({ shape }: { shape: string }) {
  return (
    <svg viewBox="0 0 32 20" width="25" height="18" aria-hidden="true">
      {Array.from({ length: 9 }, (_, index) => {
        const height =
          shape === "Spot"
            ? 14
            : shape === "Curve"
              ? 4 + 12 * Math.exp(-Math.pow((index - 4) / 2.5, 2))
              : 4 + Math.abs(index - 4) * 3;
        return (
          <rect
            key={index}
            x={index * 3.5}
            y={19 - height}
            width="2"
            height={height}
            rx=".7"
            fill="currentColor"
          />
        );
      })}
    </svg>
  );
}
function LiquidityBars({
  shape,
  large = false,
}: {
  shape: string;
  large?: boolean;
}) {
  return (
    <div
      className={`pt-liquidity-bars ${large ? "large" : ""}`}
      role="img"
      aria-label={`${shape} liquidity distribution preview`}
    >
      {Array.from({ length: 44 }, (_, index) => {
        const center = (index - 21.5) / 21.5;
        const height =
          shape === "Spot"
            ? 56 + Math.sin(index * 0.7) * 3
            : shape === "Curve"
              ? 15 + 70 * Math.exp(-Math.pow(center * 1.9, 2))
              : 15 + Math.abs(center) * 70;
        return (
          <span
            key={index}
            style={{
              height: `${height}%`,
              background: index < 22 ? "#9f81eb" : "#63c6b9",
              opacity: 0.45 + (0.55 - Math.abs(center) * 0.3),
            }}
          />
        );
      })}
      <i />
    </div>
  );
}
function MarketCandles({
  pool,
  timeframe,
  hovered,
  onHover,
}: {
  pool: DemoPool;
  timeframe: string;
  hovered: number | null;
  onHover: (index: number | null) => void;
}) {
  const seed = pool.id.length + timeframe.charCodeAt(0);
  const candles = Array.from({ length: 50 }, (_, index) => {
    const start =
      0.97 +
      index * 0.0008 +
      Math.sin(index * 0.46 + seed) * 0.009 +
      Math.cos(index * 0.13 + seed) * 0.016;
    const close = start + Math.sin(index * 2.39 + seed) * 0.006;
    return {
      open: pool.price * start,
      close: pool.price * close,
      high:
        pool.price *
        (Math.max(start, close) + 0.003 + Math.abs(Math.sin(index)) * 0.004),
      low:
        pool.price *
        (Math.min(start, close) - 0.003 - Math.abs(Math.cos(index)) * 0.004),
      volume: 8 + Math.abs(Math.sin(index * 1.7 + seed)) * 38,
    };
  });
  const minimum = Math.min(...candles.map((item) => item.low)) * 0.997;
  const maximum = Math.max(...candles.map((item) => item.high)) * 1.003;
  const y = (value: number) =>
    20 + ((maximum - value) / (maximum - minimum)) * 220;
  const focus = candles[hovered ?? candles.length - 1];
  const hours =
    timeframe === "15m"
      ? ["09:00", "09:15", "09:30", "09:45", "10:00"]
      : timeframe === "1H"
        ? ["06:00", "07:00", "08:00", "09:00", "10:00"]
        : timeframe === "4H"
          ? ["00:00", "04:00", "08:00", "12:00", "16:00"]
          : ["MON", "TUE", "WED", "THU", "FRI"];
  return (
    <div className="pt-candle-chart">
      <div className="pt-ohlc">
        <span>
          {pool.symbol} / USD <small>{timeframe}</small>
        </span>
        <span>
          O <b>{demoMoney(focus.open, pool.price < 0.01 ? 8 : 2)}</b>
        </span>
        <span>
          H <b>{demoMoney(focus.high, pool.price < 0.01 ? 8 : 2)}</b>
        </span>
        <span>
          L <b>{demoMoney(focus.low, pool.price < 0.01 ? 8 : 2)}</b>
        </span>
        <span className={focus.close >= focus.open ? "positive" : "negative"}>
          C <b>{demoMoney(focus.close, pool.price < 0.01 ? 8 : 2)}</b>
        </span>
      </div>
      <svg
        viewBox="0 0 700 320"
        preserveAspectRatio="none"
        role="img"
        aria-label={`Illustrative ${pool.pair} candlestick chart, ${timeframe} timeframe`}
        onPointerMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          onHover(
            Math.max(
              0,
              Math.min(
                49,
                Math.floor(((event.clientX - rect.left) / rect.width) * 50),
              ),
            ),
          );
        }}
        onPointerLeave={() => onHover(null)}
      >
        {[0, 1, 2, 3, 4].map((index) => (
          <g key={index}>
            <path
              d={`M0 ${25 + index * 52}H700`}
              stroke="#ffffff08"
              strokeDasharray="3 5"
            />
            <text
              x="695"
              y={20 + index * 52}
              textAnchor="end"
              fill="#686574"
              fontSize="9"
            >
              {demoMoney(
                maximum - ((maximum - minimum) * index) / 4,
                pool.price < 0.01 ? 7 : 2,
              )}
            </text>
          </g>
        ))}
        {candles.map((candle, index) => {
          const color = candle.close >= candle.open ? "#70cab4" : "#c17c93";
          const x = 8 + index * 12.6;
          return (
            <g
              key={index}
              opacity={hovered === null || hovered === index ? 1 : 0.5}
            >
              <path
                d={`M${x + 3} ${y(candle.high)}V${y(candle.low)}`}
                stroke={color}
                strokeWidth="1.2"
              />
              <rect
                x={x}
                y={Math.min(y(candle.open), y(candle.close))}
                width="6"
                height={Math.max(2, Math.abs(y(candle.close) - y(candle.open)))}
                rx="1"
                fill={color}
              />
              <rect
                x={x}
                y={300 - candle.volume}
                width="6"
                height={candle.volume}
                rx="1"
                fill={color}
                opacity=".18"
              />
            </g>
          );
        })}
        <path
          d={`M0 ${y(pool.price)}H700`}
          stroke="#a894db"
          strokeDasharray="4 5"
          strokeOpacity=".6"
        />
        <rect
          x="640"
          y={y(pool.price) - 10}
          width="60"
          height="20"
          rx="4"
          fill="#bda7ee"
        />
        <text
          x="670"
          y={y(pool.price) + 3}
          textAnchor="middle"
          fontSize="9"
          fill="#231739"
        >
          {demoMoney(pool.price, pool.price < 0.01 ? 7 : 2)}
        </text>
        {hovered !== null && (
          <path
            d={`M${11 + hovered * 12.6} 0V304`}
            stroke="#d6c3ff50"
            strokeDasharray="3 4"
          />
        )}
      </svg>
      <div className="pt-chart-times">
        {hours.map((hour) => (
          <span key={hour}>{hour}</span>
        ))}
      </div>
      <div className="pt-chart-watermark">
        <BrandMark size={22} />
        poolers
      </div>
    </div>
  );
}
function DemoHistoryRow({ event }: { event: DemoEvent }) {
  return (
    <div className="pt-history-row">
      <span className="pt-history-icon">
        {event.action.includes("deposit") ? (
          <ArrowDownLeft size={15} />
        ) : event.action.includes("withdraw") ||
          event.action.includes("Closed") ||
          event.action.includes("Exited") ? (
          <ArrowUpRight size={15} />
        ) : (
          <Layers3 size={15} />
        )}
      </span>
      <div>
        <strong>{event.action}</strong>
        <span>{event.detail}</span>
      </div>
      <div>
        <strong>
          {demoMoney(event.amount)} {event.token}
        </strong>
        <span>
          {new Date(event.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            timeZone: "Asia/Ho_Chi_Minh",
          })}
        </span>
      </div>
      <CheckCircle2 size={13} />
    </div>
  );
}

function StepItem({
  number,
  text,
  active = false,
}: {
  number: number;
  text: string;
  active?: boolean;
}) {
  return (
    <div
      className={`signup-step flex items-center gap-4 rounded-xl px-4 py-3.5 text-sm ${active ? "bg-white text-black border border-white" : "bg-brand-gray text-white border-none"}`}
      aria-current={active ? "step" : undefined}
    >
      <span
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-medium ${active ? "bg-black text-white" : "bg-white/10 text-white/40"}`}
      >
        {number}
      </span>
      <span>{text}</span>
      {active && <ArrowRight size={14} className="ml-auto" />}
    </div>
  );
}

function SocialButton({
  icon,
  label,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-12 items-center justify-center gap-2.5 bg-black border border-white/10 rounded-xl hover:bg-white/5 text-sm font-medium transition-colors"
    >
      {icon}
      {label}
    </button>
  );
}

function InputGroup({
  label,
  placeholder,
  type,
  name,
  autoComplete,
  minLength,
  defaultValue,
}: {
  label: string;
  placeholder: string;
  type: string;
  name?: string;
  autoComplete?: string;
  minLength?: number;
  defaultValue?: string;
}) {
  const id = useId();
  return (
    <div className="flex flex-col gap-2.5">
      <label htmlFor={id} className="text-sm font-medium text-white">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        minLength={minLength}
        defaultValue={defaultValue}
        required
        maxLength={type === "password" ? 128 : 254}
        pattern={type === "text" ? ".*\\S.*" : undefined}
        className={`bg-brand-gray border-none rounded-xl h-11 px-4 text-white placeholder:text-white/20 focus:ring-2 focus:ring-white/20 outline-none w-full ${name === "password" ? "pr-12" : ""}`}
      />
    </div>
  );
}
