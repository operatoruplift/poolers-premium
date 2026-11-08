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
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bell,
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
  LayoutDashboard,
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
        : "Poolers — Everyone is an LP.";
  }, [path]);
  return (
    <MotionConfig reducedMotion="user">
      {path === "/signup" ? (
        <SignUp onHome={() => navigate("/")} />
      ) : (
        <PoolersHome onSignUp={() => navigate("/signup")} />
      )}
    </MotionConfig>
  );
}

function BrandMark({ size = 38 }: { size?: number }) {
  return (
    <img
      src="/poolers-mark.svg"
      width={size}
      height={size}
      alt=""
      className="brand-mark"
    />
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

function SignUp({ onHome }: { onHome: () => void }) {
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
              <button type="button" className="signup-submit" onClick={onHome}>
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
  const [view, setView] = useState("Overview");
  const [period, setPeriod] = useState("1M");
  const [query, setQuery] = useState("");
  const [selectedPool, setSelectedPool] = useState<string | null>(null);
  const [amount, setAmount] = useState("100");
  const previewAmount = Number(amount);
  const validAmount =
    amount.trim() !== "" &&
    Number.isFinite(previewAmount) &&
    previewAmount >= 0 &&
    previewAmount <= 100000000;
  const searchInput = useRef<HTMLInputElement>(null);
  const [faq, setFaq] = useState<number | null>(0);
  const [notification, setNotification] = useState(false);
  const gradientId = useId().replaceAll(":", "");
  const pools = [
    {
      pair: "SOL / USDC",
      name: "The balanced one",
      platform: "Concentrated liquidity",
      apr: "18.42%",
      tvl: "$2.84M",
      change: "+4.28%",
      risk: "Balanced",
      tone: "purple",
      symbols: ["S", "$"],
    },
    {
      pair: "SOL / USDT",
      name: "Steady currents",
      platform: "Concentrated liquidity",
      apr: "14.86%",
      tvl: "$1.62M",
      change: "+2.61%",
      risk: "Balanced",
      tone: "teal",
      symbols: ["S", "₮"],
    },
    {
      pair: "JUP / SOL",
      name: "A little more upside",
      platform: "Concentrated liquidity",
      apr: "26.34%",
      tvl: "$946K",
      change: "+6.12%",
      risk: "Dynamic",
      tone: "orange",
      symbols: ["J", "S"],
    },
  ];
  const filteredPools = pools.filter((pool) =>
    `${pool.pair} ${pool.name} ${pool.risk}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  const periods: Record<
    string,
    { balance: string; change: string; earned: string; line: string }
  > = {
    "1W": {
      balance: "24,680.42",
      change: "+2.34%",
      earned: "124.68",
      line: "M0 151 C25 151 30 118 51 125 S90 144 113 111 S149 124 173 90 S208 105 237 69 S268 94 294 65 S332 80 359 43 S399 62 429 26 S465 36 490 12",
    },
    "1M": {
      balance: "24,680.42",
      change: "+8.42%",
      earned: "486.32",
      line: "M0 151 C21 154 27 141 43 146 S63 126 79 130 S101 107 117 112 S131 137 149 121 S169 141 186 117 S211 100 228 109 S246 73 262 82 S279 59 297 75 S316 47 333 58 S353 33 370 48 S388 27 405 37 S425 4 444 18 S470 26 490 7",
    },
    "3M": {
      balance: "24,680.42",
      change: "+14.67%",
      earned: "1,204.86",
      line: "M0 160 C21 156 27 168 49 151 S78 158 97 140 S131 156 154 121 S187 129 210 101 S244 118 266 83 S299 93 324 61 S353 77 377 42 S405 58 429 26 S460 38 490 7",
    },
  };
  const currentPeriod = periods[period];
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
      "You will enter the Poolers onboarding preview. This redesign currently demonstrates the interface; wallet connections and live liquidity transactions are not enabled.",
    ],
  ];
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchInput.current?.focus();
      }
      if (event.key === "Escape") {
        setMenuOpen(false);
        setSelectedPool(null);
        setNotification(false);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  useEffect(() => {
    if (!selectedPool) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [selectedPool]);
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
            Get started <ArrowUpRight size={15} />
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
            Get started <ArrowUpRight size={16} />
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
          className="ph-dashboard-bezel"
          initial={{ opacity: 0, y: 65 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="ph-dashboard">
            <aside className="ph-sidebar">
              <div className="ph-dashboard-brand">
                <BrandMark size={28} />
                <span>
                  poolers<span>.</span>
                </span>
              </div>
              <div className="ph-workspace">
                <div className="ph-workspace-avatar">J</div>
                <div>
                  <strong>Jamie’s workspace</strong>
                  <span>Personal account</span>
                </div>
                <ChevronDown size={13} />
              </div>
              <p className="ph-sidebar-label">WORKSPACE</p>
              <div className="ph-side-links">
                {[
                  { label: "Overview", icon: LayoutDashboard },
                  { label: "Pools", icon: Waves },
                  { label: "Strategies", icon: Layers3 },
                  { label: "Portfolio", icon: Wallet },
                ].map(({ label, icon: Icon }) => (
                  <button
                    key={label}
                    className={view === label ? "is-active" : ""}
                    onClick={() => {
                      setView(label);
                      setQuery("");
                    }}
                  >
                    <Icon size={16} />
                    <span>{label}</span>
                    {label === "Strategies" && <small>3</small>}
                  </button>
                ))}
              </div>
              <div className="ph-sidebar-bottom">
                <div className="ph-sidebar-tip">
                  <Sparkles size={17} />
                  <strong>Better, together.</strong>
                  <p>Discover the people behind your next strategy.</p>
                  <button
                    onClick={() => {
                      setView("Strategies");
                      setQuery("");
                    }}
                  >
                    Explore strategies <ArrowUpRight size={13} />
                  </button>
                </div>
                <button className="ph-help-link" onClick={() => goTo("faqs")}>
                  <CircleHelp size={15} />
                  Help & resources
                  <ArrowUpRight size={12} />
                </button>
                <div className="ph-network">
                  <span />
                  Solana mainnet<span className="ph-demo-label">PREVIEW</span>
                </div>
              </div>
            </aside>
            <div className="ph-dash-main">
              <header className="ph-dash-header">
                <div className="ph-dash-breadcrumb">
                  Workspace
                  <ChevronRight size={12} />
                  <strong>{view}</strong>
                </div>
                <div className="ph-dash-header-actions">
                  <label className="ph-search">
                    <Search size={13} />
                    <input
                      ref={searchInput}
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Find a pool or strategy…"
                      aria-label="Find a pool or strategy"
                    />
                    <kbd>⌘ K</kbd>
                  </label>
                  <button
                    className="ph-notifications"
                    aria-label="View notifications"
                    aria-expanded={notification}
                    onClick={() => setNotification(!notification)}
                  >
                    <Bell size={15} />
                    <i />
                  </button>
                  <span className="ph-user-avatar">J</span>
                </div>
                {notification && (
                  <div className="ph-notification-popover">
                    <strong>You’re all caught up.</strong>
                    <p>Your position updates will appear here.</p>
                    <span>Interactive preview · sample data</span>
                  </div>
                )}
              </header>
              <div className="ph-dashboard-body">
                <div className="ph-dash-title">
                  <div>
                    <div className="ph-greeting">
                      YOUR NEXT CHAPTER IN LIQUIDITY
                    </div>
                    <h2>
                      {view === "Overview"
                        ? "Good morning, Jamie"
                        : view === "Portfolio"
                          ? "Your liquidity, at a glance"
                          : view === "Pools"
                            ? "Find your current"
                            : "Good company. Great strategies."}
                      <span className="ph-title-sparkle">✳</span>
                    </h2>
                    <p>
                      {view === "Overview"
                        ? "A little perspective on your portfolio."
                        : view === "Portfolio"
                          ? "All your positions. One clear perspective."
                          : view === "Pools"
                            ? "Discover a pool that fits your approach."
                            : "Explore the ideas behind the positions."}
                    </p>
                  </div>
                  <button
                    className="ph-add-liquidity"
                    onClick={() => setSelectedPool("SOL / USDC")}
                  >
                    <Plus size={14} />
                    Add liquidity
                  </button>
                </div>
                {(view === "Overview" || view === "Portfolio") && (
                  <>
                    <div className="ph-stat-strip">
                      <div>
                        <span>
                          <span className="ph-stat-dot purple" />
                          Total portfolio
                        </span>
                        <strong>
                          ${currentPeriod.balance}
                          <small>USD</small>
                        </strong>
                        <em>
                          <ArrowUpRight size={12} />
                          {currentPeriod.change}
                          <span>
                            this{" "}
                            {period === "1W"
                              ? "week"
                              : period === "1M"
                                ? "month"
                                : "quarter"}
                          </span>
                        </em>
                      </div>
                      <div>
                        <span>
                          <span className="ph-stat-dot teal" />
                          Fees earned
                        </span>
                        <strong>${currentPeriod.earned}</strong>
                        <em>
                          <ArrowUpRight size={12} />
                          +12.8%<span>vs. previous period</span>
                        </em>
                      </div>
                      <div>
                        <span>
                          <span className="ph-stat-dot warm" />
                          Active positions
                        </span>
                        <strong>
                          03
                          <span className="ph-stat-pool-icons">
                            <i>S</i>
                            <i>$</i>
                            <i>J</i>
                          </span>
                        </strong>
                        <a href="#pool-positions" onClick={() => setQuery("")}>
                          Across 3 liquidity pools <ArrowUpRight size={11} />
                        </a>
                      </div>
                    </div>
                    <div className="ph-performance-row">
                      <div className="ph-chart-card">
                        <div className="ph-card-heading">
                          <div>
                            <h3>Portfolio performance</h3>
                            <p>A clearer view of your momentum.</p>
                          </div>
                          <div
                            className="ph-periods"
                            aria-label="Chart time period"
                          >
                            {["1W", "1M", "3M"].map((value) => (
                              <button
                                key={value}
                                className={period === value ? "is-active" : ""}
                                aria-pressed={period === value}
                                onClick={() => setPeriod(value)}
                              >
                                {value}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="ph-chart">
                          <div className="ph-chart-y">
                            <span>$25k</span>
                            <span>$20k</span>
                            <span>$15k</span>
                          </div>
                          <svg
                            viewBox="0 0 490 175"
                            role="img"
                            aria-label={`Illustrative portfolio performance over ${period}, ${currentPeriod.change}`}
                            preserveAspectRatio="none"
                          >
                            <defs>
                              <linearGradient
                                id={`chart-${gradientId}`}
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                              >
                                <stop
                                  offset="0%"
                                  stopColor="#a98aff"
                                  stopOpacity=".25"
                                />
                                <stop
                                  offset="100%"
                                  stopColor="#a98aff"
                                  stopOpacity="0"
                                />
                              </linearGradient>
                            </defs>
                            <path
                              d={`${currentPeriod.line} L490 175 L0 175 Z`}
                              fill={`url(#chart-${gradientId})`}
                            />
                            <path
                              d="M0 25H490 M0 90H490 M0 155H490"
                              stroke="white"
                              strokeOpacity=".055"
                              strokeDasharray="3 5"
                              fill="none"
                            />
                            <path
                              key={period}
                              className="ph-chart-line"
                              d={currentPeriod.line}
                              stroke="#b7a0ff"
                              strokeWidth="2.5"
                              fill="none"
                              vectorEffect="non-scaling-stroke"
                            />
                            <circle
                              cx="489"
                              cy={period === "1W" ? "12" : "7"}
                              r="4"
                              fill="#d2c3ff"
                            />
                          </svg>
                          <span className="ph-chart-endpoint">
                            ${currentPeriod.balance}
                          </span>
                        </div>
                        <div className="ph-chart-x">
                          {(period === "1W"
                            ? ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]
                            : period === "1M"
                              ? [
                                  "JUL 01",
                                  "JUL 07",
                                  "JUL 14",
                                  "JUL 21",
                                  "JUL 28",
                                ]
                              : ["MAY", "JUN", "JUL"]
                          ).map((value) => (
                            <span key={value}>{value}</span>
                          ))}
                        </div>
                      </div>
                      <div className="ph-insight-card">
                        <div className="ph-insight-icon">
                          <Sparkles size={17} />
                        </div>
                        <span>THE POOLERS PERSPECTIVE</span>
                        <h3>
                          Every position
                          <br />
                          has a bigger picture.
                        </h3>
                        <p>
                          Explore strategies, understand the range, and find
                          your own flow.
                        </p>
                        <button onClick={() => setView("Strategies")}>
                          Find your strategy <ArrowUpRight size={14} />
                        </button>
                        <div className="ph-insight-orbit">
                          <i />
                          <i />
                          <i />
                          <span>
                            <BrandMark size={64} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                <div
                  className={`ph-pools-section ${view === "Pools" || view === "Strategies" ? "ph-pools-expanded" : ""}`}
                  id="pool-positions"
                >
                  <div className="ph-pools-heading">
                    <h3>
                      {view === "Strategies"
                        ? "Explore strategies"
                        : view === "Pools"
                          ? "Discover pools"
                          : "Your liquidity positions"}
                      <span>{filteredPools.length}</span>
                    </h3>
                    <span className="ph-table-note">Illustrative data</span>
                    {view === "Overview" || view === "Portfolio" ? (
                      <button
                        onClick={() => {
                          setView("Pools");
                          setQuery("");
                        }}
                      >
                        View all pools <ArrowUpRight size={12} />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setView("Overview");
                          setQuery("");
                        }}
                      >
                        Back to overview <ArrowUpRight size={12} />
                      </button>
                    )}
                  </div>
                  <div className="ph-pool-table">
                    <div className="ph-pool-table-head">
                      <span>
                        {view === "Strategies"
                          ? "STRATEGY / POOL"
                          : "POOL / ASSET"}
                      </span>
                      <span>EST. APR</span>
                      <span>LIQUIDITY</span>
                      <span>30D CHANGE</span>
                      <span />
                    </div>
                    {filteredPools.map((pool) => (
                      <button
                        className="ph-pool-row"
                        key={pool.pair}
                        onClick={() => setSelectedPool(pool.pair)}
                      >
                        <span className="ph-pool-identity">
                          <span className={`ph-token-pair ${pool.tone}`}>
                            <i>{pool.symbols[0]}</i>
                            <i>{pool.symbols[1]}</i>
                          </span>
                          <span>
                            <strong>
                              {view === "Strategies" ? pool.name : pool.pair}
                            </strong>
                            <small>
                              {view === "Strategies"
                                ? pool.pair
                                : pool.platform}
                            </small>
                          </span>
                        </span>
                        <span className="ph-pool-apr">{pool.apr}</span>
                        <span>{pool.tvl}</span>
                        <span className="ph-pool-change">{pool.change}</span>
                        <span className="ph-pool-chevron">
                          <ArrowUpRight size={14} />
                        </span>
                      </button>
                    ))}
                    {filteredPools.length === 0 && (
                      <div className="ph-no-results">
                        <Search size={20} />
                        <strong>No pools match “{query}”</strong>
                        <button onClick={() => setQuery("")}>
                          Clear search
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="ph-dash-footnote">
                  <ShieldCheck size={12} />
                  <span>Your next move, with a little more clarity.</span>
                  <span>Demo workspace · no live transactions</span>
                </div>
              </div>
            </div>
          </div>
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

      {selectedPool && (
        <PoolPreviewDialog onClose={() => setSelectedPool(null)}>
          <motion.div
            className="ph-pool-modal"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
          >
            <button
              className="ph-modal-close"
              onClick={() => setSelectedPool(null)}
              aria-label="Close pool preview"
              autoFocus
            >
              <X size={20} />
            </button>
            <span className="ph-modal-eyebrow">
              <Waves size={15} />
              POOL PREVIEW
            </span>
            <h2 id="ph-pool-dialog-title">{selectedPool}</h2>
            <p>Get a feel for your next position.</p>
            <label className="ph-amount-label" htmlFor="ph-amount">
              Explore an amount
            </label>
            <div className="ph-amount-input">
              <input
                id="ph-amount"
                type="number"
                inputMode="decimal"
                min="0"
                max="100000000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <span>USDC</span>
            </div>
            <div className="ph-pool-modal-info">
              <span>
                Illustrative 50 / 50 allocation
                <strong>
                  {validAmount
                    ? `${(previewAmount / 2).toLocaleString("en-US", { maximumFractionDigits: 2 })} USDC per side`
                    : "Enter an amount from 0 to 100M"}
                </strong>
              </span>
              <span>
                Pool assets<strong>{selectedPool}</strong>
              </span>
              <span>
                Position type<strong>Concentrated liquidity</strong>
              </span>
            </div>
            <p className="ph-demo-explainer">
              This is an interactive preview. No funds move and no wallet is
              connected.
            </p>
            <button
              className="ph-primary"
              onClick={() => {
                setSelectedPool(null);
                onSignUp();
              }}
            >
              Explore onboarding <ArrowUpRight size={17} />
            </button>
          </motion.div>
        </PoolPreviewDialog>
      )}
    </div>
  );
}

function PoolPreviewDialog({
  onClose,
  children,
}: {
  onClose: () => void;
  children: ReactNode;
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
      aria-labelledby="ph-pool-dialog-title"
      className="ph-native-dialog"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {children}
    </dialog>
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
