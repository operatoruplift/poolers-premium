import {
  createChart,
  CandlestickSeries,
  HistogramSeries,
  ColorType,
  CrosshairMode,
  LineStyle,
  type UTCTimestamp,
  type ISeriesApi,
  type IPriceLine,
  type MouseEventParams,
  type Time,
  type AutoscaleInfo,
} from "lightweight-charts";
import strategyCatalog from "../public/strategy-catalog.json";
import marketCatalog from "../public/market-catalog.json";
import {
  useEffect,
  useLayoutEffect,
  useId,
  useRef,
  useMemo,
  type KeyboardEvent as RangeKeyboardEvent,
  type PointerEvent as RangePointerEvent,
  useState,
  type FormEvent,
  type ReactNode,
  type CSSProperties,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import {
  motion,
  MotionConfig,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import {
  ArrowDownLeft,
  CheckCircle2,
  Clock3,
  Copy,
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
  Eye,
  EyeOff,
  Github,
  Layers3,
  Menu,
  Plus,
  Minus,
  Maximize2,
  Minimize2,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  Wallet,
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
          : "Poolers — Everyone is an LP";
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
        fill="#a98af5"
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
      ? "Create profile"
      : step === 2
        ? "Preferences"
        : "Review profile";
  const subtitle =
    step === 1
      ? "Add your account details"
      : step === 2
        ? "Choose your preferences"
        : "Check your details before continuing";
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
              Complete your profile in three steps
            </p>
          </motion.div>
          <motion.div variants={reveal} className="space-y-3">
            <StepItem number={1} text="Account details" active={step === 1} />
            <StepItem number={2} text="Preferences" active={step === 2} />
            <StepItem number={3} text="Review profile" active={step === 3} />
          </motion.div>
        </motion.div>
        <div className="signup-caption absolute bottom-7 left-0 w-full text-center z-10"></div>
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
                Profile saved, {profile.firstName}
              </h1>
              <p>Profile saved</p>
              <div className="signup-preview-notice">
                <ShieldCheck size={18} />
                <span>Your password is not saved</span>
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
                  <span /> Profile setup{" "}
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
                          "Use the form to set up your profile, or open the workspace to connect a wallet",
                        )
                      }
                    />
                    <SocialButton
                      icon={<Github size={18} />}
                      label="Github"
                      onClick={() =>
                        setNotice(
                          "Use the form to set up your profile, or open the workspace to connect a wallet",
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
                      placeholder="you@domain.com"
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
                  <div className="signup-select-label">
                    <span>Your experience</span>
                    <BrandSelect
                      id="profile-experience"
                      label="Your experience"
                      value={profile.experience}
                      onChange={(experience) =>
                        setProfile({
                          ...profile,
                          experience,
                        })
                      }
                      options={[
                        { value: "Getting started", label: "Getting started" },
                        { value: "A few pools in", label: "A few pools in" },
                        { value: "Experienced LP", label: "Experienced LP" },
                      ]}
                    />
                  </div>
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
                    <span>Your preferences are saved in this browser</span>
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
                <ShieldCheck size={13} /> Your password is never saved.
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
        <h2 id="notice-title">Profile setup</h2>
        <p>{message}</p>
        <button type="button" className="signup-submit" onClick={onClose}>
          Continue exploring
        </button>
      </div>
    </dialog>
  );
}

function PoolersHome({ onSignUp }: { onSignUp: () => void }) {
  const opening = useRef<HTMLElement>(null);
  const nav = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [distribution, setDistribution] = useState("Spot");
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: opening,
    offset: ["start start", "end end"],
  });
  const copyOpacity = useTransform(scrollYProgress, (value) =>
    value <= 0.16 ? 1 : Math.max(0, 1 - (value - 0.16) / 0.3),
  );
  const copyY = useTransform(scrollYProgress, [0, 0.5], ["0vh", "-9vh"]);
  const copyScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.93]);
  const windowY = useTransform(
    scrollYProgress,
    [0, 0.78, 1],
    ["8vh", "-35vh", "-36vh"],
  );
  const windowScale = useTransform(scrollYProgress, [0, 0.8], [0.86, 1]);
  const windowOpacity = useTransform(scrollYProgress, [0, 0.42], [0.68, 1]);
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const questions = [
    [
      "What is Poolers?",
      "Poolers is a workspace for Solana liquidity providers. Discover pools, create price-range strategies, and manage your positions.",
    ],
    [
      "How do shared strategies work?",
      "A strategy defines a pool, a price range, and a liquidity distribution. Other LPs can join the same strategy and follow its positioning.",
    ],
    [
      "Which distributions can I use?",
      "Choose Spot for a uniform distribution, Curve for more liquidity near the active price, or Bid Ask for more liquidity toward the edges.",
    ],
    [
      "What is the creator fee?",
      "The creator fee is a share of followers’ strategy profits. Set it when creating a strategy, then review it before joining someone else’s.",
    ],
  ];

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const onPointer = (event: PointerEvent) => {
      if (!nav.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [menuOpen]);

  const goTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };
  const showWorkspace = () => {
    const section = opening.current;
    if (section)
      window.scrollTo({
        top: section.offsetTop + section.offsetHeight - window.innerHeight,
        behavior: reducedMotion ? "auto" : "smooth",
      });
  };

  return (
    <div className="pl-home" data-reduced-motion={reducedMotion || undefined}>
      <a className="skip-link" href="#landing-content">
        Skip to content
      </a>
      <nav ref={nav} className="pl-nav" aria-label="Main navigation">
        <button
          className="pl-brand"
          aria-label="Poolers home"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: reducedMotion ? "auto" : "smooth",
            })
          }
        >
          <BrandMark size={34} />
          <span>poolers</span>
        </button>
        <div className="pl-nav-links">
          <button onClick={() => goTo("protocol")}>Protocol</button>
          <button onClick={() => goTo("strategies")}>Strategies</button>
          <button onClick={() => goTo("faqs")}>FAQs</button>
        </div>
        <div className="pl-nav-actions">
          <button className="pl-launch pl-nav-launch" onClick={onSignUp}>
            Open app <ArrowUpRight size={15} />
          </button>
          <button
            className="pl-menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="pl-mobile-menu"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
        {menuOpen && (
          <div id="pl-mobile-menu" className="pl-mobile-menu">
            <button onClick={() => goTo("protocol")}>
              Protocol <ArrowUpRight size={15} />
            </button>
            <button onClick={() => goTo("strategies")}>
              Strategies <ArrowUpRight size={15} />
            </button>
            <button onClick={() => goTo("faqs")}>
              FAQs <ArrowUpRight size={15} />
            </button>
            <button onClick={onSignUp}>
              Open app <ArrowUpRight size={15} />
            </button>
          </div>
        )}
      </nav>

      <main id="landing-content" tabIndex={-1}>
        <section
          ref={opening}
          className="pl-opening"
          aria-label="Poolers liquidity workspace"
        >
          <div className="pl-sticky-stage">
            <div className="pl-stage-dots" aria-hidden="true" />
            <div className="pl-edge-light pl-edge-blue" aria-hidden="true" />
            <div className="pl-edge-light pl-edge-violet" aria-hidden="true" />
            <motion.div
              className="pl-hero-copy"
              style={
                reducedMotion
                  ? undefined
                  : { opacity: copyOpacity, y: copyY, scale: copyScale }
              }
            >
              <div
                className="pl-token-marks"
                aria-label="Solana liquidity markets"
              >
                {[
                  { name: "Solana", src: "/tokens/sol.png" },
                  { name: "USD Coin", src: "/tokens/usdc.png" },
                  { name: "Jupiter", src: "/tokens/jup.png" },
                  { name: "Raydium", src: "/tokens/ray.png" },
                  { name: "Jito", src: "/tokens/jitosol.png" },
                ].map((token) => (
                  <img
                    key={token.name}
                    src={token.src}
                    alt={token.name}
                    width="34"
                    height="34"
                  />
                ))}
              </div>
              <h1>Everyone is an LP</h1>
              <p>
                Discover Solana pools, set your range,
                <br />
                and follow the strategies behind the liquidity.
              </p>
              <button className="pl-launch pl-hero-launch" onClick={onSignUp}>
                Open app <ArrowUpRight size={18} />
              </button>
            </motion.div>
            <motion.div
              className="pl-product-window"
              style={
                reducedMotion
                  ? undefined
                  : { y: windowY, scale: windowScale, opacity: windowOpacity }
              }
            >
              <button
                className="pl-workspace-link"
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
                    alt="Poolers workspace with pool discovery, market chart, strategies, and price-range controls"
                    width="1440"
                    height="1000"
                  />
                </picture>
                <span className="pl-window-action">
                  Open workspace <ArrowUpRight size={16} />
                </span>
              </button>
            </motion.div>
            <motion.button
              className="pl-scroll-hint"
              onClick={showWorkspace}
              style={reducedMotion ? undefined : { opacity: scrollHintOpacity }}
            >
              Explore the workspace <ChevronDown size={19} />
            </motion.button>
          </div>
        </section>

        <section className="pl-protocol pl-content-section" id="protocol">
          <div className="pl-section-heading">
            <span>01 / Protocol</span>
            <h2>
              Pools, ranges,
              <br />
              and positions.
            </h2>
            <p>
              The controls an LP needs,
              <br />
              in one workspace.
            </p>
          </div>
          <div className="pl-protocol-steps">
            <article>
              <span>01</span>
              <div>
                <h3>Choose a pool</h3>
                <p>
                  Compare liquidity, volume, and fee tiers across Solana
                  markets.
                </p>
              </div>
              <ArrowUpRight size={18} />
            </article>
            <article>
              <span>02</span>
              <div>
                <h3>Set your range</h3>
                <p>Choose your price boundaries and liquidity distribution.</p>
              </div>
              <ArrowUpRight size={18} />
            </article>
            <article>
              <span>03</span>
              <div>
                <h3>Manage your position</h3>
                <p>
                  Track fees, join strategies, or close a position from your
                  portfolio.
                </p>
              </div>
              <ArrowUpRight size={18} />
            </article>
          </div>
        </section>

        <section className="pl-strategies pl-content-section" id="strategies">
          <div className="pl-section-heading">
            <span>02 / Strategies</span>
            <h2>
              Set the shape
              <br />
              of your liquidity.
            </h2>
            <p>
              Uniform, concentrated, or weighted
              <br />
              toward the edges. The range is yours.
            </p>
            <button className="pl-text-link" onClick={onSignUp}>
              Explore strategies <ArrowUpRight size={16} />
            </button>
          </div>
          <div className="pl-distribution-panel">
            <div className="pl-distribution-pair">
              <span>
                <img src="/tokens/sol.png" alt="" width="32" height="32" />
                <img src="/tokens/usdc.png" alt="" width="32" height="32" />
              </span>
              <div>
                <strong>SOL / USDC</strong>
                <span>Liquidity distribution</span>
              </div>
            </div>
            <div
              className="pl-distribution-tabs"
              aria-label="Liquidity distribution"
            >
              {["Spot", "Curve", "Bid Ask"].map((shape) => (
                <button
                  key={shape}
                  className={distribution === shape ? "active" : ""}
                  aria-pressed={distribution === shape}
                  onClick={() => setDistribution(shape)}
                >
                  {shape}
                </button>
              ))}
            </div>
            <div
              className="pl-distribution-chart"
              role="img"
              aria-label={`${distribution} liquidity distribution`}
            >
              {Array.from({ length: 46 }, (_, index) => {
                const distance = Math.abs((index - 22.5) / 22.5);
                const height =
                  distribution === "Spot"
                    ? 72
                    : distribution === "Curve"
                      ? Math.max(8, 82 * (1 - distance))
                      : Math.max(8, 82 * distance);
                return (
                  <span
                    key={index}
                    style={{
                      height: `${height}%`,
                      background: index < 23 ? "#2576ed" : "#9b54e8",
                    }}
                  />
                );
              })}
              <i />
            </div>
            <div className="pl-distribution-axis">
              <span>Lower price</span>
              <span>Pool price</span>
              <span>Higher price</span>
            </div>
            <div className="pl-distribution-description">
              {distribution === "Spot"
                ? "Equal liquidity across the selected range."
                : distribution === "Curve"
                  ? "More liquidity near the current pool price."
                  : "More liquidity toward the range boundaries."}
            </div>
          </div>
        </section>

        <section className="pl-faqs pl-content-section" id="faqs">
          <div className="pl-section-heading">
            <span>03 / FAQs</span>
            <h2>Before you pool.</h2>
          </div>
          <div className="pl-faq-list">
            {questions.map(([question, answer], index) => (
              <article
                className={openFaq === index ? "active" : ""}
                key={question}
              >
                <button
                  aria-expanded={openFaq === index}
                  aria-controls={`pl-answer-${index}`}
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  {question}
                  <Plus size={18} />
                </button>
                <div
                  className="pl-faq-answer"
                  id={`pl-answer-${index}`}
                  inert={openFaq !== index}
                >
                  <div>
                    <p>{answer}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="pl-final-cta">
          <BrandMark size={50} />
          <h2>Find your pool.</h2>
          <button className="pl-launch" onClick={onSignUp}>
            Open app <ArrowUpRight size={17} />
          </button>
        </section>
      </main>
      <footer className="pl-footer">
        <span>© {new Date().getFullYear()} Poolers</span>
        <div>
          <button onClick={() => goTo("protocol")}>Protocol</button>
          <button onClick={() => goTo("strategies")}>Strategies</button>
          <button onClick={() => goTo("faqs")}>FAQs</button>
        </div>
        <button onClick={onSignUp}>
          Open app <ArrowUpRight size={13} />
        </button>
      </footer>
    </div>
  );
}

type PoolMarket = {
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
  address: string;
  iconX: string | null;
  iconY: string | null;
  binStep: number;
  feePct: number;
  marketCap: string;
  marketCapUsd: number;
  quotePriceUsd: number;
  pairPrice: number;
  fees24h: string;
  feeTvl: number;
};
const MARKETS: PoolMarket[] = marketCatalog;

type FundingAsset = "USDC" | "SOL";
type LiquidityPosition = {
  id: string;
  poolId: string;
  title: string;
  units: number;
  usd: number;
  token: FundingAsset;
  kind: "created" | "joined";
  shape: string;
  side?: string;
  fee: number;
  min: number;
  max: number;
  status: "active" | "closed";
  date: string;
};
type ActivityEvent = {
  id: string;
  poolId?: string;
  action: string;
  detail: string;
  amount: number;
  token: FundingAsset;
  date: string;
};
type Workspace = {
  version: 1;
  connected: boolean;
  balances: { USDC: number; SOL: number };
  positions: LiquidityPosition[];
  events: ActivityEvent[];
  profile: { name: string; handle: string; bio: string };
  following: string[];
};
type PoolStrategy = {
  id: string;
  poolId: string;
  title: string;
  creator: string;
  initials: string;
  tone: string;
  apr: number;
  members: number;
  valueUsd: number;
  avatar: string | null;
  creatorFee: number;
  followersCount: number;
  shape: string;
};
const STRATEGIES: PoolStrategy[] = strategyCatalog;
const CREATORS = [...new Set(STRATEGIES.map((strategy) => strategy.creator))];

const STORAGE_KEY = "poolers.workspace.v2";
function newWorkspace(): Workspace {
  return {
    version: 1,
    connected: false,
    balances: { USDC: 10000, SOL: 12.5 },
    positions: [
      {
        id: "initial-1",
        poolId: "sol-usdc",
        title: "SOL · Spot",
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
        title: "JUP · Bid Ask",
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
        poolId: "jup-sol",
        action: "Joined strategy",
        detail: "JUP · Bid Ask · JUP / SOL",
        amount: 800,
        token: "USDC",
        date: "2026-11-05T10:00:00Z",
      },
    ],
    profile: {
      name: "Jamie Carter",
      handle: "jamie.lp",
      bio: "Liquidity provider",
    },
    following: ["flozzyboy"],
  };
}
function readWorkspace(): Workspace {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
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
        (p: LiquidityPosition) =>
          MARKETS.some((pool) => pool.id === p.poolId) &&
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
    /* A new can always start without browser storage. */
  }
  return newWorkspace();
}
function formatMoney(value: number, digits = 2) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}
function formatPrice(value: number) {
  return "$" + formatMoney(value, value < 0.01 ? 8 : value < 10 ? 4 : 2);
}
function roundAmount(value: number) {
  return Math.round(value * 1000000) / 1000000;
}
function marketAmount(value: string) {
  const match = value.replaceAll(",", "").match(/([\d.]+)\s*([KMB])?/i);
  return match
    ? Number(match[1]) *
        ({ K: 1000, M: 1000000, B: 1000000000 }[
          match[2]?.toUpperCase() as "K" | "M" | "B"
        ] || 1)
    : 0;
}
type TerminalModal =
  | null
  | { kind: "wallet" | "review" | "edit" | "reset" }
  | { kind: "join"; strategy: PoolStrategy }
  | { kind: "creator"; handle: string }
  | { kind: "fund"; direction: "Deposit" | "Withdraw" }
  | { kind: "exit"; id: string };

function strategyFromLocation() {
  const id = window.location.pathname.split("/strategy/")[1];
  return STRATEGIES.find((strategy) => strategy.id === id);
}

function poolFromLocation() {
  const address = window.location.pathname.split("/pools/")[1];
  const id = new URLSearchParams(window.location.search).get("pool");
  return (
    strategyFromLocation()?.poolId ||
    MARKETS.find((pool) => pool.address === address || pool.id === id)?.id ||
    "stonk-sol"
  );
}

function PoolersTerminal({
  onHome,
  onOnboarding,
}: {
  onHome: () => void;
  onOnboarding: () => void;
}) {
  const [workspace, setWorkspace] = useState<Workspace>(readWorkspace);
  const [view, setView] = useState<"terminal" | "portfolio" | "profile">(() =>
    window.location.pathname.includes("portfolio")
      ? "portfolio"
      : window.location.pathname.endsWith("/profile")
        ? "profile"
        : "terminal",
  );
  const [selectedId, setSelectedId] = useState(poolFromLocation);
  const [discovery, setDiscovery] = useState("Strategies");
  const [strategyFeed, setStrategyFeed] = useState<"All" | "Following">("All");
  const [category, setCategory] = useState("All");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [poolSort, setPoolSort] = useState<"tvl" | "volume" | "change">("tvl");
  const [strategySort, setStrategySort] = useState<"value" | "pnl" | "members">(
    "value",
  );
  const [minLiquidity, setMinLiquidity] = useState("");
  const [maxCreatorFee, setMaxCreatorFee] = useState(25);
  const [query, setQuery] = useState("");
  const [timeframe, setTimeframe] = useState("5m");
  const [marketTab, setMarketTab] = useState("Chart");
  const [activityTab, setActivityTab] = useState("Strategies");
  const [profileTab, setProfileTab] = useState("All positions");
  const [shape, setShape] = useState("Spot");
  const [fundingToken, setFundingToken] = useState<FundingAsset>("USDC");
  const [amount, setAmount] = useState("1000");
  const [lowerBin, setLowerBin] = useState(-35);
  const [upperBin, setUpperBin] = useState(34);
  const [side, setSide] = useState<"fifty_fifty" | "base" | "quote">(
    "fifty_fifty",
  );
  const [chartUnit, setChartUnit] = useState("Price");
  const [chartReset, setChartReset] = useState(0);
  const [creatorFee, setCreatorFee] = useState(10);
  const [modal, setModal] = useState<TerminalModal>(() => {
    const strategy = strategyFromLocation();
    return strategy ? { kind: "join", strategy } : null;
  });
  const [modalAmount, setModalAmount] = useState("250");
  const [editName, setEditName] = useState("");
  const [editHandle, setEditHandle] = useState("");
  const [editBio, setEditBio] = useState("");
  const [toast, setToast] = useState("");
  const [mobilePanel, setMobilePanel] = useState("Market");
  const [positionFilter, setPositionFilter] = useState("All");
  const [discoveryCollapsed, setDiscoveryCollapsed] = useState(false);
  const [chartExpanded, setChartExpanded] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const mobileSearchRef = useRef<HTMLInputElement>(null);
  const followingFeedRef = useRef<HTMLButtonElement>(null);
  const pendingWalletAction = useRef<TerminalModal>(null);
  const pool = MARKETS.find((item) => item.id === selectedId)!;
  const minRange = Number(
    ((Math.pow(1 + pool.binStep / 10000, lowerBin) - 1) * 100).toFixed(2),
  );
  const maxRange = Number(
    ((Math.pow(1 + pool.binStep / 10000, upperBin) - 1) * 100).toFixed(2),
  );
  const searchQuery = query.trim().replace(/^@/, "").toLowerCase();
  const filteredPools = MARKETS.filter(
    (item) =>
      (category === "All" || item.category === category) &&
      `${item.pair} ${item.symbol} ${item.address}`
        .toLowerCase()
        .includes(searchQuery) &&
      marketAmount(item.tvl) >= Math.max(0, Number(minLiquidity) || 0),
  ).sort((a, b) =>
    poolSort === "change"
      ? b.change - a.change
      : marketAmount(b[poolSort === "tvl" ? "tvl" : "volume"]) -
        marketAmount(a[poolSort === "tvl" ? "tvl" : "volume"]),
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
      MARKETS.find((item) => item.id === "sol-usdc")!.price;
  const totalUsd = walletUsd + activeUsd;
  const usdAmount =
    Number(amount) *
    (fundingToken === "SOL"
      ? MARKETS.find((item) => item.id === "sol-usdc")!.price
      : 1);
  const amountValid =
    amount.trim() !== "" &&
    Number.isFinite(Number(amount)) &&
    Number(amount) > 0 &&
    Number(amount) <= workspace.balances[fundingToken];
  const poolEvents = workspace.events.filter((event) =>
    event.poolId
      ? event.poolId === selectedId
      : event.detail.includes(pool.pair),
  );
  const selectedStrategies = STRATEGIES.filter(
    (strategy) => strategy.poolId === selectedId,
  );
  const filteredStrategies = STRATEGIES.filter(
    (strategy) =>
      (strategyFeed === "All" ||
        workspace.following.includes(strategy.creator)) &&
      strategy.creatorFee <= maxCreatorFee &&
      `${strategy.title} ${strategy.creator} ${MARKETS.find((item) => item.id === strategy.poolId)?.pair}`
        .toLowerCase()
        .includes(searchQuery),
  ).sort((a, b) =>
    strategySort === "pnl"
      ? b.apr - a.apr
      : strategySort === "members"
        ? b.members - a.members
        : b.valueUsd - a.valueUsd,
  );
  const activeFilterCount =
    discovery === "Pools"
      ? Number(category !== "All") +
        Number(Number(minLiquidity) > 0) +
        Number(poolSort !== "tvl")
      : Number(strategyFeed !== "All") +
        Number(maxCreatorFee < 25) +
        Number(strategySort !== "value");
  const resetDiscoveryFilters = () => {
    setQuery("");
    setCategory("All");
    setStrategyFeed("All");
    setMinLiquidity("");
    setMaxCreatorFee(25);
    setPoolSort("tvl");
    setStrategySort("value");
  };
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
      localStorage.setItem(STORAGE_KEY, JSON.stringify(workspace));
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
      if (event.key === "Escape" && !document.querySelector("dialog[open]"))
        setChartExpanded(false);
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (document.querySelector("dialog[open]")) return;
        if (window.matchMedia("(max-width: 540px)").matches) {
          setView("terminal");
          setMobilePanel("Discover");
          window.requestAnimationFrame(() => mobileSearchRef.current?.focus());
        } else searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, []);
  useEffect(() => {
    const sync = () => {
      setSelectedId(poolFromLocation());
      setView(
        window.location.pathname.includes("portfolio")
          ? "portfolio"
          : window.location.pathname.endsWith("/profile")
            ? "profile"
            : "terminal",
      );
      setMobilePanel("Market");
      const strategy = strategyFromLocation();
      setModal(strategy ? { kind: "join", strategy } : null);
    };
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);
  const notify = (message: string) => setToast(message);
  const selectPool = (id: string) => {
    const selectedPool = MARKETS.find((item) => item.id === id);
    if (!selectedPool) return;
    window.history.pushState({}, "", `/pools/${selectedPool.address}`);
    setSelectedId(id);
    setActivityTab("Strategies");
    setView("terminal");
    setMarketTab("Chart");
    setMobilePanel("Market");
  };
  const copyStrategyLink = async (strategy: PoolStrategy) => {
    const link = new URL(`/strategy/${strategy.id}`, window.location.origin)
      .href;
    try {
      await navigator.clipboard.writeText(link);
      notify("Strategy link copied");
    } catch {
      notify("Copy this strategy’s address from the browser bar");
      window.history.pushState({}, "", `/strategy/${strategy.id}`);
      setSelectedId(strategy.poolId);
    }
  };
  const connectLocalWallet = () => {
    setWorkspace((current) => ({ ...current, connected: true }));
    setModal(pendingWalletAction.current);
    pendingWalletAction.current = null;
    notify("Wallet connected");
  };
  const eventRecord = (
    action: string,
    detail: string,
    units: number,
    token: FundingAsset,
    poolId?: string,
  ): ActivityEvent => ({
    id: crypto.randomUUID(),
    action,
    detail,
    amount: units,
    token,
    poolId,
    date: new Date().toISOString(),
  });
  const createStrategy = () => {
    if (!amountValid || !workspace.connected) return;
    const units = Number(amount);
    const position: LiquidityPosition = {
      id: crypto.randomUUID(),
      poolId: selectedId,
      title: `${pool.symbol} · ${shape}`,
      units,
      usd: usdAmount,
      token: fundingToken,
      kind: "created",
      shape,
      side,
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
        [fundingToken]: roundAmount(current.balances[fundingToken] - units),
      },
      positions: [position, ...current.positions],
      events: [
        eventRecord(
          "Created strategy",
          pool.pair,
          units,
          fundingToken,
          selectedId,
        ),
        ...current.events,
      ].slice(0, 500),
    }));
    setModal(null);
    setActivityTab("Yours");
    setMobilePanel("Market");
    notify("Strategy created");
  };
  const joinStrategy = (strategy: PoolStrategy) => {
    if (!modalValueValid || !workspace.connected) return;
    const position: LiquidityPosition = {
      id: crypto.randomUUID(),
      poolId: strategy.poolId,
      title: strategy.title,
      units: modalValue,
      usd: modalValue,
      token: "USDC",
      kind: "joined",
      shape: strategy.shape,
      fee: strategy.creatorFee,
      min: -8,
      max: 8,
      status: "active",
      date: new Date().toISOString(),
    };
    setWorkspace((current) => ({
      ...current,
      balances: {
        ...current.balances,
        USDC: roundAmount(current.balances.USDC - modalValue),
      },
      positions: [position, ...current.positions],
      events: [
        eventRecord(
          "Joined strategy",
          strategy.title,
          modalValue,
          "USDC",
          strategy.poolId,
        ),
        ...current.events,
      ].slice(0, 500),
    }));
    setModal(null);
    notify("Strategy joined");
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
        [position.token]: roundAmount(
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
          position.poolId,
        ),
        ...current.events,
      ].slice(0, 500),
    }));
    setModal(null);
    notify("Position closed");
  };
  const transferFunds = (direction: "Deposit" | "Withdraw") => {
    if (!modalValueValid) return;
    setWorkspace((current) => ({
      ...current,
      connected: true,
      balances: {
        ...current.balances,
        USDC: roundAmount(
          current.balances.USDC +
            (direction === "Deposit" ? modalValue : -modalValue),
        ),
      },
      events: [
        eventRecord(
          direction === "Deposit" ? "Deposit" : "Withdrawal",
          "wallet",
          modalValue,
          "USDC",
        ),
        ...current.events,
      ].slice(0, 500),
    }));
    setModal(null);
    notify(
      `${formatMoney(modalValue)} USDC ${direction === "Deposit" ? "added to" : "removed from"} your balance.`,
    );
  };
  const openJoin = (strategy: PoolStrategy) => {
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
  const renderPosition = (position: LiquidityPosition) => {
    const positionPool = MARKETS.find((item) => item.id === position.poolId)!;
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
          <strong>${formatMoney(position.usd)}</strong>
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
      <a className="skip-link" href="#workspace-content">
        Skip to workspace
      </a>
      <header className="pt-topbar">
        <button className="pt-brand" onClick={onHome} aria-label="Poolers home">
          <BrandMark size={32} />
          <span>Poolers</span>
        </button>
        <PoolSearch
          value={query}
          inputRef={searchRef}
          label="Search pools, tokens, or creators"
          placeholder="Pools, tokens, creators"
          onChange={(value) => {
            setQuery(value);
            setStrategyFeed("All");
            setDiscovery(
              CREATORS.some(
                (creator) =>
                  creator.includes(value.toLowerCase().replace(/^@/, "")) &&
                  value.length > 1,
              )
                ? "Strategies"
                : "Pools",
            );
            setView("terminal");
            setMobilePanel("Discover");
          }}
          onSelectPool={(id) => {
            resetDiscoveryFilters();
            selectPool(id);
          }}
          onSelectCreator={(handle) => {
            setQuery("");
            setModal({ kind: "creator", handle });
          }}
        />
        <nav aria-label="Application navigation">
          <button
            className={view === "terminal" ? "active" : ""}
            aria-pressed={view === "terminal"}
            onClick={() => setView("terminal")}
          >
            Terminal
          </button>
          <button
            className={view === "portfolio" ? "active" : ""}
            aria-pressed={view === "portfolio"}
            onClick={() => setView("portfolio")}
          >
            Portfolio
          </button>
        </nav>
        <button
          className="pt-wallet-button"
          onClick={() => {
            pendingWalletAction.current = null;
            workspace.connected
              ? openFund("Deposit")
              : setModal({ kind: "wallet" });
          }}
        >
          <Wallet size={16} />
          {workspace.connected
            ? `${formatMoney(walletUsd)} USD`
            : "Connect wallet"}
          {workspace.connected && <ChevronDown size={14} />}
        </button>
        <button
          className="pt-avatar"
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
      {view !== "terminal" && (
        <nav className="pt-mobile-account-nav" aria-label="Account navigation">
          <button onClick={() => setView("terminal")}>Terminal</button>
          <button
            className={view === "portfolio" ? "active" : ""}
            onClick={() => setView("portfolio")}
          >
            Portfolio
          </button>
          <button
            className={view === "profile" ? "active" : ""}
            onClick={() => setView("profile")}
          >
            Profile
          </button>
        </nav>
      )}
      {view === "terminal" ? (
        <>
          <div className="pt-mobile-tabs" aria-label="Workspace panel">
            {["Discover", "Market", "Create"].map((panel) => (
              <button
                key={panel}
                className={mobilePanel === panel ? "active" : ""}
                aria-pressed={mobilePanel === panel}
                onClick={() => setMobilePanel(panel)}
              >
                {panel === "Discover"
                  ? "Pools"
                  : panel === "Market"
                    ? "Chart"
                    : "Create strategy"}
              </button>
            ))}
          </div>
          <div
            id="workspace-content"
            tabIndex={-1}
            className={`pt-workspace show-${mobilePanel.toLowerCase()} ${discoveryCollapsed ? "is-discovery-collapsed" : ""} ${chartExpanded ? "is-chart-expanded" : ""}`}
          >
            <aside className="pt-discovery" id="pool-discovery">
              <div className="pt-discovery-tabs">
                {["Strategies", "Pools"].map((tab) => (
                  <button
                    key={tab}
                    className={discovery === tab ? "active" : ""}
                    aria-pressed={discovery === tab}
                    onClick={() => setDiscovery(tab)}
                  >
                    {tab}
                  </button>
                ))}
                <button
                  className="pt-icon-button"
                  title="Discovery filters"
                  aria-label="Open discovery filters"
                  aria-haspopup="dialog"
                  aria-expanded={filtersOpen}
                  onClick={() => setFiltersOpen(true)}
                >
                  <SlidersHorizontal size={16} />
                  {activeFilterCount > 0 && (
                    <span className="pt-filter-count" aria-hidden="true">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              </div>
              <PoolSearch
                variant="discover"
                inputRef={mobileSearchRef}
                value={query}
                onChange={setQuery}
                label={
                  discovery === "Pools"
                    ? "Search mobile pools"
                    : "Search strategies or creators"
                }
                placeholder={
                  discovery === "Pools"
                    ? "Search pools"
                    : "Search strategies or creators"
                }
                onSelectPool={(id) => {
                  resetDiscoveryFilters();
                  selectPool(id);
                }}
                onSelectCreator={(handle) => {
                  setQuery("");
                  setModal({ kind: "creator", handle });
                }}
              />
              {discovery === "Pools" ? (
                <>
                  <div className="pt-categories">
                    {["All", "Crypto", "Memes", "Stocks"].map((item) => (
                      <button
                        key={item}
                        className={category === item ? "active" : ""}
                        aria-pressed={category === item}
                        onClick={() => setCategory(item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                  <div className="pt-pool-list">
                    {filteredPools.map((item) => (
                      <button
                        className={`pt-pool-card ${selectedId === item.id ? "active" : ""}`}
                        key={item.id}
                        aria-label={`${item.pair} pool`}
                        aria-pressed={selectedId === item.id}
                        onClick={() => selectPool(item.id)}
                      >
                        <TokenPair pool={item} />
                        <div>
                          <strong>{item.pair.replace(" / ", "–")}</strong>
                          <span>{formatPrice(item.price)}</span>
                        </div>
                        <div>
                          <strong>
                            {item.tvl}
                            <small> TVL</small>
                          </strong>
                          <span>{item.volume} vol</span>
                        </div>
                      </button>
                    ))}
                    {!filteredPools.length && (
                      <div className="pt-empty">
                        <strong>No pools found</strong>
                        <button onClick={resetDiscoveryFilters}>
                          Clear filters
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="pt-categories pt-feed-filter"
                    aria-label="Strategy feed filter"
                  >
                    <button
                      className={strategyFeed === "All" ? "active" : ""}
                      aria-pressed={strategyFeed === "All"}
                      onClick={() => setStrategyFeed("All")}
                    >
                      All creators
                    </button>
                    <button
                      ref={followingFeedRef}
                      className={strategyFeed === "Following" ? "active" : ""}
                      aria-label="Following creators"
                      aria-pressed={strategyFeed === "Following"}
                      onClick={() => setStrategyFeed("Following")}
                    >
                      Following
                    </button>
                  </div>
                  <span className="bin-range-sr-only" role="status">
                    Showing {filteredStrategies.length} strategies
                  </span>
                  <div className="pt-curated-list">
                    {filteredStrategies.map((strategy) => (
                      <article key={strategy.id}>
                        <div className="pt-discovery-person">
                          <button
                            className="pt-strategy-author"
                            aria-label={`View ${strategy.creator} profile`}
                            onClick={() =>
                              setModal({
                                kind: "creator",
                                handle: strategy.creator,
                              })
                            }
                          >
                            <img
                              src={strategy.avatar || "/creators/default.svg"}
                              alt=""
                            />
                            <span>@{strategy.creator}</span>
                          </button>
                          <button
                            className="pt-follow-button"
                            aria-label={`${workspace.following.includes(strategy.creator) ? "Unfollow" : "Follow"} ${strategy.creator}`}
                            aria-pressed={workspace.following.includes(
                              strategy.creator,
                            )}
                            onClick={() => {
                              const removing = workspace.following.includes(
                                strategy.creator,
                              );
                              followCreator(strategy.creator);
                              if (removing && strategyFeed === "Following")
                                window.requestAnimationFrame(() =>
                                  followingFeedRef.current?.focus(),
                                );
                            }}
                          >
                            {workspace.following.includes(strategy.creator) ? (
                              <Check size={13} />
                            ) : (
                              <Plus size={13} />
                            )}
                            {workspace.following.includes(strategy.creator)
                              ? "Following"
                              : "Follow"}
                          </button>
                        </div>
                        <button
                          className="pt-strategy-discovery"
                          onClick={() => {
                            selectPool(strategy.poolId);
                            setActivityTab("Strategies");
                          }}
                        >
                          <TokenPair
                            pool={MARKETS.find(
                              (item) => item.id === strategy.poolId,
                            )!}
                          />
                          <span>
                            <strong>{strategy.title}</strong>
                            <small>
                              {strategy.shape} · {strategy.members}{" "}
                              {strategy.members === 1 ? "pooler" : "poolers"}
                            </small>
                          </span>
                          <ArrowUpRight size={14} />
                        </button>
                        <div className="pt-side-strategy-meta">
                          <span>
                            Value ${formatMoney(strategy.valueUsd || 0)}
                          </span>
                          <span
                            className={
                              strategy.apr >= 0 ? "positive" : "negative"
                            }
                          >
                            {strategy.apr >= 0 ? "+" : ""}
                            {formatMoney(strategy.apr)}%
                          </span>
                        </div>
                        <div className="pt-social-actions">
                          <button
                            className="pt-small-button"
                            onClick={() => openJoin(strategy)}
                          >
                            Join <ArrowUpRight size={13} />
                          </button>
                          <button
                            className="pt-follow-button"
                            onClick={() => copyStrategyLink(strategy)}
                            aria-label={`Copy link to ${strategy.title} by ${strategy.creator}`}
                          >
                            <Copy size={13} /> Copy link
                          </button>
                        </div>
                      </article>
                    ))}
                    {!filteredStrategies.length && (
                      <div className="pt-empty">
                        <strong>
                          {strategyFeed === "Following"
                            ? "No matching strategies from followed creators"
                            : "No strategies found"}
                        </strong>
                        <button onClick={resetDiscoveryFilters}>
                          {strategyFeed === "Following"
                            ? "Browse all creators"
                            : "Clear search"}
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
              <div className="pt-discovery-footer">
                <button onClick={onOnboarding}>
                  Profile setup <ArrowUpRight size={13} />
                </button>
                <button
                  onClick={() => setModal({ kind: "reset" })}
                  aria-label="Reset workspace"
                  title="Reset workspace"
                >
                  <RotateCcw size={14} />
                </button>
              </div>
            </aside>
            <main className="pt-market">
              <header className="pt-market-header">
                <div className="pt-market-pair">
                  <TokenPair pool={pool} />
                  <div>
                    <h1>
                      {pool.symbol}
                      <span className="pt-pool-pair-label">
                        {pool.pair.replace(" / ", "–")}
                      </span>
                    </h1>
                    <div className="pt-pool-metadata">
                      <span>{pool.feePct}% fee</span>
                      <span>{pool.binStep} bin step</span>
                      <button
                        onClick={async () => {
                          try {
                            await navigator.clipboard.writeText(pool.address);
                            notify("Pool address copied");
                          } catch {
                            notify(pool.address);
                          }
                        }}
                        title="Copy pool address"
                        aria-label="Copy pool address"
                      >
                        {pool.address.slice(0, 5)}…{pool.address.slice(-5)}{" "}
                        <Copy size={12} />
                      </button>
                    </div>
                  </div>
                </div>
                <dl className="pt-market-metrics">
                  <div>
                    <dt>Price</dt>
                    <dd>{formatPrice(pool.price)}</dd>
                  </div>
                  <div>
                    <dt>Market cap</dt>
                    <dd>{pool.marketCap}</dd>
                  </div>
                  <div>
                    <dt>TVL</dt>
                    <dd>{pool.tvl}</dd>
                  </div>
                  <div>
                    <dt>Volume 24h</dt>
                    <dd>{pool.volume}</dd>
                  </div>
                </dl>
              </header>
              <section className="pt-chart-section">
                <div className="pt-chart-toolbar">
                  <div className="pt-chart-tools">
                    <button
                      className="pt-icon-button pt-desktop-control"
                      aria-label={
                        discoveryCollapsed
                          ? "Show pool discovery"
                          : "Collapse pool discovery"
                      }
                      aria-expanded={!discoveryCollapsed}
                      disabled={chartExpanded}
                      aria-controls="pool-discovery"
                      onClick={() => setDiscoveryCollapsed((value) => !value)}
                      title={
                        discoveryCollapsed
                          ? "Show pool discovery"
                          : "Collapse pool discovery"
                      }
                    >
                      {discoveryCollapsed ? (
                        <PanelLeftOpen size={16} />
                      ) : (
                        <PanelLeftClose size={16} />
                      )}
                    </button>
                    <div className="pt-line-tabs">
                      {["Chart", "Details"].map((tab) => (
                        <button
                          key={tab}
                          className={marketTab === tab ? "active" : ""}
                          aria-pressed={marketTab === tab}
                          onClick={() => setMarketTab(tab)}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="pt-chart-settings">
                    <BrandSelect
                      label="Chart timeframe"
                      value={timeframe}
                      onChange={setTimeframe}
                      options={[
                        { value: "5m", label: "5m" },
                        { value: "15m", label: "15m" },
                        { value: "1H", label: "1h" },
                        { value: "4H", label: "4h" },
                        { value: "1D", label: "1d" },
                      ]}
                    />
                    <div className="pt-chart-unit">
                      {["Price", "MCap"].map((unit) => (
                        <button
                          key={unit}
                          className={chartUnit === unit ? "active" : ""}
                          aria-pressed={chartUnit === unit}
                          onClick={() => setChartUnit(unit)}
                        >
                          {unit}
                        </button>
                      ))}
                    </div>
                    <button
                      className="pt-icon-button"
                      aria-label="Reset chart view"
                      title="Reset chart view"
                      onClick={() => setChartReset((value) => value + 1)}
                    >
                      <RotateCcw size={14} />
                    </button>
                    <button
                      className="pt-icon-button pt-desktop-control"
                      aria-label={
                        chartExpanded ? "Restore workspace" : "Expand chart"
                      }
                      aria-pressed={chartExpanded}
                      title={
                        chartExpanded
                          ? "Restore workspace (Esc)"
                          : "Expand chart"
                      }
                      onClick={() => setChartExpanded((value) => !value)}
                    >
                      {chartExpanded ? (
                        <Minimize2 size={15} />
                      ) : (
                        <Maximize2 size={15} />
                      )}
                    </button>
                  </div>
                </div>
                {marketTab === "Chart" ? (
                  <MarketCandles
                    pool={pool}
                    timeframe={timeframe}
                    lowerBin={lowerBin}
                    upperBin={upperBin}
                    onRangeChange={(lower, upper) => {
                      setLowerBin(lower);
                      setUpperBin(upper);
                    }}
                    lowerPrice={
                      pool.price * Math.pow(1 + pool.binStep / 10000, lowerBin)
                    }
                    upperPrice={
                      pool.price * Math.pow(1 + pool.binStep / 10000, upperBin)
                    }
                    chartUnit={chartUnit}
                    resetKey={chartReset}
                  />
                ) : (
                  <div className="pt-market-details">
                    <h2>Pool details</h2>
                    <dl>
                      <div>
                        <dt>Address</dt>
                        <dd>{pool.address}</dd>
                      </div>
                      <div>
                        <dt>Assets</dt>
                        <dd>
                          {pool.symbol} / {pool.quote}
                        </dd>
                      </div>
                      <div>
                        <dt>Bin step</dt>
                        <dd>{pool.binStep} basis points</dd>
                      </div>
                      <div>
                        <dt>Base fee</dt>
                        <dd>{pool.feePct}%</dd>
                      </div>
                      <div>
                        <dt>Fees 24h</dt>
                        <dd>{pool.fees24h}</dd>
                      </div>
                      <div>
                        <dt>Fee / TVL 24h</dt>
                        <dd>{pool.feeTvl}%</dd>
                      </div>
                    </dl>
                  </div>
                )}
              </section>
              <section className="pt-activity-section">
                <div className="pt-activity-header">
                  <div className="pt-line-tabs">
                    <button
                      className={activityTab !== "History" ? "active" : ""}
                      aria-pressed={activityTab !== "History"}
                      onClick={() => setActivityTab("Strategies")}
                    >
                      Strategies
                    </button>
                    <button
                      className={activityTab === "History" ? "active" : ""}
                      aria-pressed={activityTab === "History"}
                      onClick={() => setActivityTab("History")}
                    >
                      History
                    </button>
                  </div>
                  <button className="pt-text-button" onClick={openComposer}>
                    Create strategy <Plus size={14} />
                  </button>
                </div>
                {activityTab === "History" ? (
                  <div className="pt-history-list">
                    {poolEvents.length ? (
                      poolEvents
                        .slice(0, 12)
                        .map((event) => (
                          <ActivityRow event={event} key={event.id} />
                        ))
                    ) : (
                      <div className="pt-empty">
                        <strong>No activity in this pool</strong>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="pt-position-filters">
                      <button
                        className={activityTab === "Strategies" ? "active" : ""}
                        aria-pressed={activityTab === "Strategies"}
                        onClick={() => setActivityTab("Strategies")}
                      >
                        All
                      </button>
                      <button
                        className={activityTab === "Yours" ? "active" : ""}
                        aria-pressed={activityTab === "Yours"}
                        onClick={() => setActivityTab("Yours")}
                      >
                        Yours{" "}
                        <span>
                          {activePositions.filter(
                            (item) => item.poolId === selectedId,
                          ).length || ""}
                        </span>
                      </button>
                    </div>
                    {activityTab === "Yours" ? (
                      <div className="pt-terminal-positions">
                        {activePositions.filter(
                          (item) => item.poolId === selectedId,
                        ).length ? (
                          activePositions
                            .filter((item) => item.poolId === selectedId)
                            .map(renderPosition)
                        ) : (
                          <div className="pt-empty">
                            <strong>No positions in this pool</strong>
                            <p>Your created and joined positions appear here</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="pt-strategy-list">
                        {selectedStrategies.map((strategy) => (
                          <article
                            className="pt-strategy-card"
                            id={`strategy-${strategy.id}`}
                            key={strategy.id}
                          >
                            <button
                              className="pt-strategy-author"
                              aria-label={`View ${strategy.creator} profile`}
                              onClick={() =>
                                setModal({
                                  kind: "creator",
                                  handle: strategy.creator,
                                })
                              }
                            >
                              <img
                                src={strategy.avatar || "/creators/default.svg"}
                                alt=""
                              />
                              <span>@{strategy.creator}</span>
                            </button>
                            <div className="pt-strategy-card-title">
                              <strong>{strategy.title}</strong>
                              <span>
                                {strategy.shape} · {strategy.creatorFee || 10}%
                                creator fee
                              </span>
                            </div>
                            <div className="pt-strategy-numbers">
                              <div>
                                <span>Value</span>
                                <strong>
                                  ${formatMoney(strategy.valueUsd || 0)}
                                </strong>
                              </div>
                              <div>
                                <span>PnL</span>
                                <strong
                                  className={
                                    strategy.apr >= 0 ? "positive" : "negative"
                                  }
                                >
                                  {strategy.apr >= 0 ? "+" : ""}
                                  {formatMoney(strategy.apr)}%
                                </strong>
                              </div>
                            </div>
                            <button
                              className="pt-small-button"
                              onClick={() => openJoin(strategy)}
                            >
                              Join
                            </button>
                            <div className="pt-social-actions">
                              <button
                                className="pt-follow-button"
                                aria-label={`${workspace.following.includes(strategy.creator) ? "Unfollow" : "Follow"} ${strategy.creator}`}
                                aria-pressed={workspace.following.includes(
                                  strategy.creator,
                                )}
                                onClick={() => followCreator(strategy.creator)}
                              >
                                {workspace.following.includes(
                                  strategy.creator,
                                ) ? (
                                  <Check size={14} />
                                ) : (
                                  <Plus size={14} />
                                )}
                                {workspace.following.includes(strategy.creator)
                                  ? "Following"
                                  : "Follow"}
                              </button>
                              <span>
                                <Users size={13} /> {strategy.members}{" "}
                                {strategy.members === 1 ? "pooler" : "poolers"}
                              </span>
                              <button
                                className="pt-follow-button"
                                onClick={() => copyStrategyLink(strategy)}
                                aria-label={`Copy link to ${strategy.title} by ${strategy.creator}`}
                              >
                                <Copy size={13} /> Copy link
                              </button>
                            </div>
                          </article>
                        ))}
                        {activePositions
                          .filter(
                            (item) =>
                              item.poolId === selectedId &&
                              item.kind === "created",
                          )
                          .map(renderPosition)}
                        {!selectedStrategies.length &&
                          !activePositions.some(
                            (item) =>
                              item.poolId === selectedId &&
                              item.kind === "created",
                          ) && (
                            <div className="pt-empty">
                              <strong>No strategies in this pool</strong>
                              <p>
                                Shared strategies in this pool will show up here
                              </p>
                            </div>
                          )}
                      </div>
                    )}
                  </>
                )}
              </section>
            </main>
            <aside className="pt-composer">
              <div className="pt-line-tabs">
                <button
                  className="active"
                  onClick={() =>
                    document.getElementById("strategy-amount")?.focus()
                  }
                >
                  Create strategy
                </button>
              </div>
              <div className="pt-composer-body">
                <FeeControl value={creatorFee} onChange={setCreatorFee} />
                <div className="pt-field-heading">
                  <label htmlFor="strategy-amount">Amount</label>
                  <div className="pt-funding-switch">
                    {(["USDC", "SOL"] as FundingAsset[]).map((token) => (
                      <button
                        key={token}
                        className={fundingToken === token ? "active" : ""}
                        onClick={() => setFundingToken(token)}
                        aria-label={`Fund with ${token}`}
                        title={token}
                      >
                        <img
                          src={`/tokens/${token.toLowerCase()}.png`}
                          alt={token}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="pt-amount-box">
                  <div className="pt-amount-token">
                    <img
                      src={`/tokens/${fundingToken.toLowerCase()}.png`}
                      alt=""
                    />
                    <strong>{fundingToken}</strong>
                    <ChevronDown size={12} />
                  </div>
                  <input
                    id="strategy-amount"
                    aria-label="Strategy amount"
                    type="number"
                    inputMode="decimal"
                    step="any"
                    min="0"
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                  />
                  <div className="pt-available">
                    <span>
                      Available {formatMoney(workspace.balances[fundingToken])}{" "}
                      <button
                        onClick={() =>
                          setAmount(String(workspace.balances[fundingToken]))
                        }
                      >
                        Max
                      </button>
                    </span>
                    <span>
                      ${formatMoney(Number.isFinite(usdAmount) ? usdAmount : 0)}
                    </span>
                  </div>
                </div>
                {!amountValid && (
                  <p className="pt-field-error" role="status">
                    {Number(amount) <= 0
                      ? "Enter an amount above zero"
                      : "Amount exceeds available balance"}
                  </p>
                )}
                <div className="pt-field-heading">
                  <span>Strategy</span>
                  <span
                    className="pt-side-switch"
                    aria-label="Token allocation"
                  >
                    {[
                      { value: "fifty_fifty", label: "50 / 50" },
                      { value: "base", label: pool.symbol },
                      { value: "quote", label: pool.quote },
                    ].map((item) => (
                      <button
                        key={item.value}
                        aria-pressed={side === item.value}
                        className={side === item.value ? "active" : ""}
                        onClick={() => {
                          setSide(
                            item.value as "fifty_fifty" | "base" | "quote",
                          );
                          setLowerBin(
                            item.value === "base"
                              ? 1
                              : item.value === "quote"
                                ? -70
                                : -35,
                          );
                          setUpperBin(
                            item.value === "base"
                              ? 70
                              : item.value === "quote"
                                ? -1
                                : 34,
                          );
                        }}
                      >
                        {item.label}
                      </button>
                    ))}
                  </span>
                </div>
                <div className="pt-shape-picker">
                  {["Spot", "Curve", "Bid Ask"].map((item) => (
                    <button
                      key={item}
                      className={shape === item ? "active" : ""}
                      aria-pressed={shape === item}
                      onClick={() => setShape(item)}
                    >
                      <ShapeIcon shape={item} />
                      {item}
                    </button>
                  ))}
                </div>
                <div className="pt-field-heading pt-range-heading">
                  <span>Price range</span>
                  <button
                    className="pt-icon-button"
                    onClick={() => {
                      setLowerBin(-35);
                      setUpperBin(34);
                    }}
                    aria-label="Reset price range"
                    title="Reset price range"
                  >
                    <RotateCcw size={14} />
                  </button>
                </div>
                <div className="pt-bin-legend">
                  <span>
                    <i />
                    {pool.symbol}
                  </span>
                  <span>
                    <i />
                    {pool.quote}
                  </span>
                  <span>
                    {pool.quote}/{pool.symbol}
                  </span>
                </div>
                <BinRangeControl
                  price={pool.pairPrice}
                  unitLabel={`${pool.quote} per ${pool.symbol}`}
                  binStep={pool.binStep}
                  lowerBin={lowerBin}
                  upperBin={upperBin}
                  shape={shape}
                  side={side}
                  onRangeChange={(lower, upper) => {
                    setLowerBin(lower);
                    setUpperBin(upper);
                  }}
                />
                <div className="pt-bin-count">
                  <span>Total bins</span>
                  <strong>{upperBin - lowerBin + 1}</strong>
                </div>
              </div>
              <div className="pt-composer-footer">
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
                    ? "Review strategy"
                    : "Connect wallet to create strategy"}
                  <ArrowRight size={16} />
                </button>
              </div>
            </aside>
          </div>
        </>
      ) : (
        <main id="workspace-content" tabIndex={-1} className="pt-account-page">
          <div className="pt-account-header">
            <div>
              <span className="pt-eyebrow">Account</span>
              <h1>
                {view === "portfolio" ? "Portfolio" : workspace.profile.name}
              </h1>
              <p>
                {view === "portfolio"
                  ? "Manage positions and available funds"
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
                    Deposit
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
                <strong>Connect your wallet</strong>
                <span>Manage positions and available funds</span>
              </div>
              <button onClick={() => setModal({ kind: "wallet" })}>
                Connect wallet <ArrowRight size={15} />
              </button>
            </div>
          )}
          <div className="pt-account-stats">
            <article>
              <span>Total value</span>
              <strong>${formatMoney(totalUsd)}</strong>
              <small>Wallet + active positions</small>
            </article>
            <article>
              <span>Available in wallet</span>
              <strong>${formatMoney(walletUsd)}</strong>
              <small>
                {formatMoney(workspace.balances.USDC)} USDC +{" "}
                {formatMoney(workspace.balances.SOL)} SOL
              </small>
            </article>
            <article>
              <span>Active liquidity</span>
              <strong>${formatMoney(activeUsd)}</strong>
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
              <span>{view === "profile" ? "Following" : "Fees earned"}</span>
              <strong>
                {view === "profile" ? workspace.following.length : "$0.00"}
              </strong>
              <small>
                {view === "profile" ? "Creators in your circle" : ""}
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
                    <ActivityRow key={event.id} event={event} />
                  ))}
                  {!workspace.events.length && (
                    <div className="pt-empty">
                      <Clock3 size={24} />
                      <strong>No activity yet</strong>
                      <p>Your activity will appear here.</p>
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
                      <strong>No active positions</strong>
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
              <span className="pt-eyebrow">Creators</span>
              <h2>
                Follow creators
                <br />
              </h2>
              <p>Follow creators and view their strategies</p>
              {CREATORS.map((creator, index) => (
                <div key={creator} className="pt-follow-row">
                  <span
                    className={`pt-creator-avatar tone-${["teal", "purple", "orange"][index]}`}
                  >
                    <img
                      src={
                        STRATEGIES.find(
                          (strategy) => strategy.creator === creator,
                        )?.avatar || "/creators/default.svg"
                      }
                      alt=""
                      width={34}
                      height={34}
                      style={{ borderRadius: "50%", objectFit: "cover" }}
                    />
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
                  <button
                    aria-pressed={workspace.following.includes(creator)}
                    onClick={() => followCreator(creator)}
                  >
                    {workspace.following.includes(creator)
                      ? "Following"
                      : "Follow"}
                  </button>
                </div>
              ))}
            </aside>
          </div>
          <div className="pt-account-footer">
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
      {filtersOpen && (
        <TerminalDialog
          className="pt-filter-dialog"
          onClose={() => setFiltersOpen(false)}
        >
          <div className="pt-filter-heading">
            <h2 id="pt-dialog-title">Discovery filters</h2>
            <button
              className="pt-icon-button"
              aria-label="Close filters"
              onClick={() => setFiltersOpen(false)}
            >
              <X size={18} />
            </button>
          </div>
          <p>
            {discovery === "Pools"
              ? "Narrow the pool list"
              : "Find shared strategies"}
          </p>
          <fieldset className="pt-filter-section">
            <legend>Sort by</legend>
            <div className="pt-filter-options">
              {discovery === "Pools"
                ? (
                    [
                      { value: "tvl", label: "Liquidity" },
                      { value: "volume", label: "24h volume" },
                      { value: "change", label: "Price change" },
                    ] as const
                  ).map((option) => (
                    <button
                      key={option.value}
                      aria-pressed={poolSort === option.value}
                      onClick={() => setPoolSort(option.value)}
                    >
                      {option.label}
                    </button>
                  ))
                : (
                    [
                      { value: "value", label: "Position value" },
                      { value: "pnl", label: "PnL" },
                      { value: "members", label: "Participants" },
                    ] as const
                  ).map((option) => (
                    <button
                      key={option.value}
                      aria-pressed={strategySort === option.value}
                      onClick={() => setStrategySort(option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
            </div>
          </fieldset>
          {discovery === "Pools" ? (
            <>
              <fieldset className="pt-filter-section">
                <legend>Asset category</legend>
                <div className="pt-filter-options">
                  {["All", "Crypto", "Memes", "Stocks"].map((item) => (
                    <button
                      key={item}
                      aria-pressed={category === item}
                      onClick={() => setCategory(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </fieldset>
              <label className="pt-filter-section pt-filter-number">
                Minimum liquidity{" "}
                <span>
                  <input
                    type="number"
                    min="0"
                    max="1000000000000"
                    step="1000"
                    inputMode="decimal"
                    placeholder="No minimum"
                    aria-label="Minimum liquidity in USD"
                    value={minLiquidity}
                    onChange={(event) => setMinLiquidity(event.target.value)}
                  />
                  <span>USD</span>
                </span>
              </label>
            </>
          ) : (
            <>
              <fieldset className="pt-filter-section">
                <legend>Creators</legend>
                <div className="pt-filter-options">
                  {(["All", "Following"] as const).map((item) => (
                    <button
                      key={item}
                      aria-pressed={strategyFeed === item}
                      onClick={() => setStrategyFeed(item)}
                    >
                      {item === "All" ? "All creators" : "Following"}
                    </button>
                  ))}
                </div>
              </fieldset>
              <fieldset className="pt-filter-section">
                <legend>Maximum creator fee</legend>
                <div className="pt-filter-options">
                  {[
                    { value: 25, label: "Any fee" },
                    { value: 10, label: "10%" },
                    { value: 20, label: "20%" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      aria-pressed={maxCreatorFee === option.value}
                      onClick={() => setMaxCreatorFee(option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </fieldset>
            </>
          )}
          <p className="pt-filter-results" role="status">
            {discovery === "Pools"
              ? `${filteredPools.length} ${filteredPools.length === 1 ? "pool matches" : "pools match"}`
              : `${filteredStrategies.length} ${filteredStrategies.length === 1 ? "strategy matches" : "strategies match"}`}
          </p>
          <div className="pt-filter-footer">
            <button
              className="pt-secondary-button"
              onClick={resetDiscoveryFilters}
            >
              Reset filters
            </button>
            <button
              className="pt-primary"
              onClick={() => setFiltersOpen(false)}
            >
              Show results <ArrowRight size={15} />
            </button>
          </div>
        </TerminalDialog>
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
              <h2 id="pt-dialog-title">Connect wallet</h2>
              <p>Choose a wallet for this workspace</p>
              <div className="pt-local-wallet-card">
                <Wallet size={23} />
                <div>
                  <strong>Local wallet</strong>
                  <span>Browser workspace</span>
                </div>
                <span className="pt-check-round">
                  <Check size={13} />
                </span>
              </div>
              <div className="pt-modal-notice">
                <ShieldCheck size={17} />
                <span>Local workspace · no transactions are submitted</span>
              </div>
              <button className="pt-primary" onClick={connectLocalWallet}>
                Use local wallet <ArrowRight size={16} />
              </button>
            </>
          ) : modal.kind === "review" ? (
            <>
              <h2 id="pt-dialog-title">Review strategy</h2>
              <p>Confirm the pool, amount, and price range</p>
              <div className="pt-review-pair">
                <TokenPair pool={pool} />
                <strong>{pool.pair}</strong>
                <span>{shape}</span>
              </div>
              <dl className="pt-review-details">
                <div>
                  <dt>Amount</dt>
                  <dd>
                    {formatMoney(Number(amount))} {fundingToken}
                  </dd>
                </div>
                <div>
                  <dt>Value</dt>
                  <dd>${formatMoney(usdAmount)}</dd>
                </div>
                <div>
                  <dt>
                    Price range ({pool.quote}/{pool.symbol})
                  </dt>
                  <dd>
                    {binControlPriceFormat(
                      pool.pairPrice * (1 + minRange / 100),
                    )}{" "}
                    —{" "}
                    {binControlPriceFormat(
                      pool.pairPrice * (1 + maxRange / 100),
                    )}
                  </dd>
                </div>
                <div>
                  <dt>Creator fee</dt>
                  <dd>{creatorFee}%</dd>
                </div>
                <div>
                  <dt>Allocation</dt>
                  <dd>
                    {side === "base"
                      ? pool.symbol
                      : side === "quote"
                        ? pool.quote
                        : "50 / 50"}
                  </dd>
                </div>
              </dl>
              <div className="pt-modal-notice">
                <ShieldCheck size={17} />
                <span>Review the allocation before continuing</span>
              </div>
              <button
                className="pt-primary"
                onClick={createStrategy}
                disabled={!amountValid}
              >
                Create strategy <ArrowRight size={16} />
              </button>
            </>
          ) : modal.kind === "join" ? (
            <>
              <h2 id="pt-dialog-title">Join strategy</h2>
              <p>
                Join “{modal.strategy.title}” by {modal.strategy.creator}.
              </p>
              <label className="pt-modal-input-label">
                Your allocation
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
                Available: {formatMoney(workspace.balances.USDC)} USDC
              </span>
              <dl className="pt-review-details">
                <div>
                  <dt>Shape</dt>
                  <dd>{modal.strategy.shape}</dd>
                </div>
                <div>
                  <dt>Creator fee</dt>
                  <dd>{modal.strategy.creatorFee}% of strategy profits</dd>
                </div>
                <div>
                  <dt>LPs in this strategy</dt>
                  <dd>{modal.strategy.members}</dd>
                </div>
              </dl>
              {!modalValueValid && (
                <p className="pt-field-error">
                  Enter an amount within your available balance
                </p>
              )}
              <button
                className="pt-primary"
                disabled={!modalValueValid}
                onClick={() => {
                  if (workspace.connected) joinStrategy(modal.strategy);
                  else {
                    pendingWalletAction.current = modal;
                    setModal({ kind: "wallet" });
                  }
                }}
              >
                {workspace.connected
                  ? "Join strategy"
                  : "Connect wallet to join"}{" "}
                <ArrowRight size={16} />
              </button>
            </>
          ) : modal.kind === "fund" ? (
            <>
              <h2 id="pt-dialog-title">
                {modal.direction === "Deposit" ? "Deposit" : "Withdraw"}
              </h2>
              <p>
                {modal.direction === "Deposit"
                  ? "Enter an amount to deposit"
                  : "Enter an amount to withdraw"}
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
                Current balance: {formatMoney(workspace.balances.USDC)} USDC
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
                <span>Available balance updates after confirmation</span>
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
                {modal.direction} funds <ArrowRight size={16} />
              </button>
            </>
          ) : modal.kind === "exit" ? (
            (() => {
              const position = workspace.positions.find(
                (item) => item.id === modal.id,
              );
              return position ? (
                <>
                  <span className="pt-eyebrow">Manage position</span>
                  <h2 id="pt-dialog-title">
                    {position.kind === "created"
                      ? "Close strategy?"
                      : "Exit strategy?"}
                  </h2>
                  <p>
                    Close “{position.title}” and return its principal to your
                    wallet.
                  </p>
                  <dl className="pt-review-details">
                    <div>
                      <dt>Funds returned</dt>
                      <dd>
                        {formatMoney(position.units)} {position.token}
                      </dd>
                    </div>
                    <div>
                      <dt>Value</dt>
                      <dd>${formatMoney(position.usd)}</dd>
                    </div>
                  </dl>
                  <div className="pt-modal-notice">
                    <ShieldCheck size={17} />
                    <span>
                      This action returns the position balance to your wallet
                    </span>
                  </div>
                  <button
                    className="pt-primary"
                    onClick={() => exitPosition(position.id)}
                  >
                    {position.kind === "created"
                      ? "Close strategy"
                      : "Exit strategy"}
                    <ArrowRight size={16} />
                  </button>
                </>
              ) : null;
            })()
          ) : modal.kind === "creator" ? (
            <>
              <span className="pt-eyebrow">Creators</span>
              <h2 id="pt-dialog-title">@{modal.handle}</h2>
              <p>View this creator’s strategies</p>
              <div className="pt-creator-profile-stats">
                <div>
                  <strong>
                    {STRATEGIES.find(
                      (strategy) => strategy.creator === modal.handle,
                    )?.followersCount || 0}
                  </strong>
                  <span>followers</span>
                </div>
                <div>
                  <strong>
                    {
                      STRATEGIES.filter(
                        (strategy) => strategy.creator === modal.handle,
                      ).length
                    }
                  </strong>
                  <span>strategies</span>
                </div>
                <div>
                  <strong>10%</strong>
                  <span>creator fee</span>
                </div>
              </div>
              <button
                className="pt-primary"
                aria-pressed={workspace.following.includes(modal.handle)}
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
                {STRATEGIES.filter(
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
                          MARKETS.find((item) => item.id === strategy.poolId)
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
                notify("Profile saved");
              }}
            >
              <span className="pt-eyebrow">Profile</span>
              <h2 id="pt-dialog-title">Edit profile</h2>
              <p>Update your profile</p>
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
                Bio
                <textarea
                  maxLength={140}
                  value={editBio}
                  onChange={(event) => setEditBio(event.target.value)}
                />
              </label>
              <button className="pt-primary" type="submit">
                Save profile <Check size={16} />
              </button>
            </form>
          ) : (
            <>
              <span className="pt-eyebrow">Reset workspace</span>
              <h2 id="pt-dialog-title">Reset workspace?</h2>
              <p>
                This resets only your positions, balances, activity, and profile
                in this browser.
              </p>
              <button
                className="pt-primary"
                onClick={() => {
                  setWorkspace(newWorkspace());
                  setModal(null);
                  setView("terminal");
                  notify("Workspace reset");
                }}
              >
                Reset workspace <RotateCcw size={16} />
              </button>
              <button
                className="pt-modal-cancel"
                onClick={() => setModal(null)}
              >
                Cancel
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
  className = "",
}: {
  children: ReactNode;
  onClose: () => void;
  className?: string;
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
      className={`pt-dialog ${className}`}
      ref={ref}
      aria-labelledby="pt-dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < bounds.left ||
          event.clientX > bounds.right ||
          event.clientY < bounds.top ||
          event.clientY > bounds.bottom
        )
          onClose();
      }}
    >
      <div className="pt-dialog-content">{children}</div>
    </dialog>
  );
}
function TokenPair({ pool }: { pool: PoolMarket }) {
  return (
    <span className="pt-token-pair" aria-hidden="true">
      <img
        src={pool.iconX || "/creators/default.svg"}
        alt=""
        loading="lazy"
        decoding="async"
      />
      <img
        src={pool.iconY || "/creators/default.svg"}
        alt=""
        loading="lazy"
        decoding="async"
      />
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
              ? 4 + (4 - Math.abs(index - 4)) * 3
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
type MarketBar = {
  t: number;
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
};
type MarketHistory = {
  candles: MarketBar[];
  source?: string;
  updatedAt?: string;
  history?: { stale?: boolean; updatedAt?: string };
};
function MarketCandles({
  pool,
  timeframe,
  lowerBin,
  upperBin,
  onRangeChange,
  lowerPrice,
  upperPrice,
  chartUnit,
  resetKey,
}: {
  pool: PoolMarket;
  timeframe: string;
  lowerBin: number;
  upperBin: number;
  onRangeChange: (lower: number, upper: number) => void;
  lowerPrice: number;
  upperPrice: number;
  chartUnit: string;
  resetKey: number;
}) {
  const descriptionId = useId();
  const canvasId = `${descriptionId}-canvas`;
  const resizeHintId = `${descriptionId}-resize-help`;
  const boundaryHintId = `${descriptionId}-boundary-help`;
  const canvasRef = useRef<HTMLDivElement>(null);
  const boundaryDragRef = useRef<{
    pointerId: number;
    edge: "lower" | "upper";
    offsetY: number;
    startLower: number;
    startUpper: number;
    autoScale: boolean;
  } | null>(null);
  const boundsRef = useRef({ lower: lowerBin, upper: upperBin });
  boundsRef.current = { lower: lowerBin, upper: upperBin };
  const onRangeChangeRef = useRef(onRangeChange);
  onRangeChangeRef.current = onRangeChange;
  const [boundaryDragging, setBoundaryDragging] = useState<
    "lower" | "upper" | null
  >(null);
  const chartResizeRef = useRef<{
    pointerId: number;
    startY: number;
    startHeight: number;
    previousHeight: number | null;
  } | null>(null);
  const [userChartHeight, setUserChartHeight] = useState<number | null>(null);
  const [observedChartHeight, setObservedChartHeight] = useState(340);
  const [chartResizing, setChartResizing] = useState(false);
  const chartRef = useRef<ReturnType<typeof createChart> | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const linesRef = useRef<IPriceLine[]>([]);
  const [history, setHistory] = useState<MarketHistory | null>(null);
  const [error, setError] = useState("");
  const [focus, setFocus] = useState<MarketBar | null>(null);
  const [retry, setRetry] = useState(0);
  const [band, setBand] = useState<{
    top: number;
    height: number;
    lowerY: number;
    upperY: number;
    lowerOffscreen: boolean;
    upperOffscreen: boolean;
  } | null>(null);
  const rangeRef = useRef({ lowerPrice, upperPrice });
  rangeRef.current = { lowerPrice, upperPrice };
  const multiplier =
    chartUnit === "MCap" && pool.marketCapUsd > 0
      ? pool.marketCapUsd / pool.price
      : 1;
  const chartPrice = (value: number) =>
    chartUnit === "MCap"
      ? new Intl.NumberFormat("en-US", {
          notation: "compact",
          maximumFractionDigits: 2,
        }).format(value)
      : formatMoney(value, value < 0.01 ? 8 : value < 1 ? 5 : 2);
  const publishBoundary = (edge: "lower" | "upper", requested: number) => {
    const current = boundsRef.current;
    const next =
      edge === "lower"
        ? {
            ...current,
            lower: Math.max(
              -80,
              Math.min(current.upper - 1, Math.round(requested)),
            ),
          }
        : {
            ...current,
            upper: Math.max(
              current.lower + 1,
              Math.min(80, Math.round(requested)),
            ),
          };
    if (next.lower === current.lower && next.upper === current.upper) return;
    boundsRef.current = next;
    onRangeChangeRef.current(next.lower, next.upper);
  };
  const finishBoundaryDrag = (
    element: HTMLButtonElement,
    cancelled = false,
  ) => {
    const drag = boundaryDragRef.current;
    if (!drag) return;
    boundaryDragRef.current = null;
    setBoundaryDragging(null);
    if (cancelled) {
      boundsRef.current = { lower: drag.startLower, upper: drag.startUpper };
      onRangeChangeRef.current(drag.startLower, drag.startUpper);
    }
    seriesRef.current?.priceScale().applyOptions({ autoScale: drag.autoScale });
    if (element.hasPointerCapture(drag.pointerId))
      element.releasePointerCapture(drag.pointerId);
    window.requestAnimationFrame(renderBand);
  };
  const beginBoundaryDrag = (
    event: RangePointerEvent<HTMLButtonElement>,
    edge: "lower" | "upper",
  ) => {
    const series = seriesRef.current;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (event.button !== 0 || !series || !rect || boundaryDragRef.current)
      return;
    const coordinate = series.priceToCoordinate(
      rangeRef.current[edge === "lower" ? "lowerPrice" : "upperPrice"] *
        multiplier,
    );
    if (coordinate === null) return;
    event.preventDefault();
    event.stopPropagation();
    const scale = series.priceScale();
    boundaryDragRef.current = {
      pointerId: event.pointerId,
      edge,
      offsetY: event.clientY - rect.top - coordinate,
      startLower: boundsRef.current.lower,
      startUpper: boundsRef.current.upper,
      autoScale: scale.options().autoScale,
    };
    // Hold the vertical scale during the gesture so a moving bound cannot rescale itself.
    scale.applyOptions({ autoScale: false });
    event.currentTarget.focus({ preventScroll: true });
    event.currentTarget.setPointerCapture(event.pointerId);
    setBoundaryDragging(edge);
  };
  const moveBoundaryDrag = (event: RangePointerEvent<HTMLButtonElement>) => {
    const drag = boundaryDragRef.current;
    const rect = canvasRef.current?.getBoundingClientRect();
    const series = seriesRef.current;
    if (!drag || drag.pointerId !== event.pointerId || !rect || !series) return;
    event.preventDefault();
    event.stopPropagation();
    const displayedPrice = series.coordinateToPrice(
      event.clientY - rect.top - drag.offsetY,
    );
    if (displayedPrice === null || displayedPrice <= 0) return;
    const usdPrice = Number(displayedPrice) / multiplier;
    const bin =
      Math.log(usdPrice / pool.price) / Math.log(1 + pool.binStep / 10000);
    if (Number.isFinite(bin)) publishBoundary(drag.edge, bin);
  };
  const boundaryKeyboard = (
    event: RangeKeyboardEvent<HTMLButtonElement>,
    edge: "lower" | "upper",
  ) => {
    if (event.key === "Escape" && boundaryDragRef.current) {
      event.preventDefault();
      event.stopPropagation();
      finishBoundaryDrag(event.currentTarget, true);
      return;
    }
    const current = boundsRef.current;
    const increment = event.shiftKey ? 10 : 1;
    const bin = edge === "lower" ? current.lower : current.upper;
    const next =
      event.key === "ArrowUp" || event.key === "ArrowRight"
        ? bin + increment
        : event.key === "ArrowDown" || event.key === "ArrowLeft"
          ? bin - increment
          : event.key === "PageUp"
            ? bin + 10
            : event.key === "PageDown"
              ? bin - 10
              : event.key === "Home"
                ? edge === "lower"
                  ? -80
                  : current.lower + 1
                : event.key === "End"
                  ? edge === "lower"
                    ? current.upper - 1
                    : 80
                  : null;
    if (next !== null) {
      event.preventDefault();
      event.stopPropagation();
      publishBoundary(edge, next);
    }
  };
  const clampChartHeight = (height: number) =>
    Math.max(340, Math.min(1000, Math.round(height)));
  const finishChartResize = (element: HTMLDivElement, cancelled = false) => {
    const drag = chartResizeRef.current;
    if (!drag) return;
    chartResizeRef.current = null;
    setChartResizing(false);
    if (cancelled) setUserChartHeight(drag.previousHeight);
    if (element.hasPointerCapture(drag.pointerId))
      element.releasePointerCapture(drag.pointerId);
  };
  useEffect(() => {
    const element = canvasRef.current;
    if (!element) return;
    const measure = () =>
      setObservedChartHeight(
        Math.round(element.getBoundingClientRect().height),
      );
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    setHistory(null);
    setError("");
    setFocus(null);
    fetch(`/history/${pool.id}.json`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error();
        return response.json();
      })
      .then((value: MarketHistory) => {
        if (!Array.isArray(value.candles) || !value.candles.length)
          throw new Error();
        setHistory(value);
      })
      .catch((error) => {
        if (error.name !== "AbortError")
          setError("Price history is unavailable");
      });
    return () => controller.abort();
  }, [pool.id, retry]);
  const bars = useMemo(() => {
    if (!history) return [];
    const interval =
      (
        {
          "5m": 300,
          "15m": 900,
          "1H": 3600,
          "4H": 14400,
          "1D": 86400,
        } as Record<string, number>
      )[timeframe] || 300;
    const buckets = new Map<number, MarketBar>();
    for (const candle of [...history.candles].sort((a, b) => a.t - b.t)) {
      if (
        ![candle.t, candle.o, candle.h, candle.l, candle.c].every(
          Number.isFinite,
        ) ||
        candle.c <= 0
      )
        continue;
      const time = Math.floor(candle.t / 1000 / interval) * interval;
      const previous = buckets.get(time);
      if (previous) {
        previous.h = Math.max(previous.h, candle.h);
        previous.l = Math.min(previous.l, candle.l);
        previous.c = candle.c;
        previous.v += Number.isFinite(candle.v) ? candle.v : 0;
      } else
        buckets.set(time, {
          ...candle,
          t: time,
          v: Number.isFinite(candle.v) ? candle.v : 0,
        });
    }
    return [...buckets.values()];
  }, [history, timeframe]);
  const renderBand = () => {
    const series = seriesRef.current;
    if (!series) {
      setBand(null);
      return;
    }
    const lower = series.priceToCoordinate(
      rangeRef.current.lowerPrice * multiplier,
    );
    const upper = series.priceToCoordinate(
      rangeRef.current.upperPrice * multiplier,
    );
    if (lower === null || upper === null) {
      setBand(null);
      return;
    }
    const height = canvasRef.current?.clientHeight || 0;
    const top = Math.max(0, Math.min(lower, upper));
    const lastMarkerY = Math.max(22, height - 48);
    const next = {
      top,
      height: Math.max(0, Math.min(height, Math.max(lower, upper)) - top),
      lowerY: Math.max(22, Math.min(lastMarkerY, lower)),
      upperY: Math.max(22, Math.min(lastMarkerY, upper)),
      lowerOffscreen: lower < 22 || lower > lastMarkerY,
      upperOffscreen: upper < 22 || upper > lastMarkerY,
    };
    setBand((previous) =>
      previous &&
      Math.abs(previous.top - next.top) < 0.1 &&
      Math.abs(previous.height - next.height) < 0.1 &&
      Math.abs(previous.lowerY - next.lowerY) < 0.1 &&
      Math.abs(previous.upperY - next.upperY) < 0.1 &&
      previous.lowerOffscreen === next.lowerOffscreen &&
      previous.upperOffscreen === next.upperOffscreen
        ? previous
        : next,
    );
  };
  useEffect(() => {
    const element = canvasRef.current;
    if (!element || !bars.length) return;
    const chart = createChart(element, {
      autoSize: true,
      layout: {
        background: { type: ColorType.Solid, color: "#060510" },
        textColor: "#8c8c99",
        fontFamily: "Inter, ui-sans-serif, sans-serif",
        fontSize: 11,
        attributionLogo: true,
      },
      grid: {
        vertLines: { color: "#ffffff06" },
        horzLines: { color: "#ffffff08" },
      },
      rightPriceScale: {
        borderColor: "#ffffff0b",
        scaleMargins: { top: 0.08, bottom: 0.2 },
        minimumWidth: 66,
      },
      timeScale: {
        borderColor: "#ffffff0b",
        timeVisible: true,
        secondsVisible: false,
        rightOffset: 5,
        barSpacing: 8,
        minBarSpacing: 3,
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: { color: "#81818e", labelBackgroundColor: "#303038" },
        horzLine: { color: "#81818e", labelBackgroundColor: "#303038" },
      },
      localization: {
        priceFormatter: chartPrice,
        timeFormatter: (time: Time) =>
          new Date(Number(time) * 1000).toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "Asia/Ho_Chi_Minh",
          }),
      },
      handleScroll: {
        mouseWheel: true,
        pressedMouseMove: true,
        horzTouchDrag: true,
        vertTouchDrag: false,
      },
      handleScale: {
        axisPressedMouseMove: true,
        mouseWheel: true,
        pinch: true,
      },
    });
    const candles = chart.addSeries(CandlestickSeries, {
      upColor: "#2ecb9c",
      downColor: "#ed6877",
      borderUpColor: "#2ecb9c",
      borderDownColor: "#ed6877",
      wickUpColor: "#2ecb9c",
      wickDownColor: "#ed6877",
      priceLineColor: "#8d77c4",
      priceLineStyle: LineStyle.Dashed,
      priceLineWidth: 1,
      lastValueVisible: true,
      priceFormat: {
        type: "custom",
        formatter: chartPrice,
        minMove:
          pool.price < 0.01 ? 0.00000001 : pool.price < 1 ? 0.00001 : 0.01,
      },
    });
    candles.setData(
      bars.map((bar) => ({
        time: bar.t as UTCTimestamp,
        open: bar.o * multiplier,
        high: bar.h * multiplier,
        low: bar.l * multiplier,
        close: bar.c * multiplier,
      })),
    );
    const volume = chart.addSeries(HistogramSeries, {
      priceFormat: { type: "volume" },
      priceScaleId: "volume",
      lastValueVisible: false,
      priceLineVisible: false,
    });
    volume
      .priceScale()
      .applyOptions({ scaleMargins: { top: 0.84, bottom: 0 }, visible: false });
    volume.setData(
      bars.map((bar) => ({
        time: bar.t as UTCTimestamp,
        value: bar.v,
        color: bar.c >= bar.o ? "#2ecb9c26" : "#ed687726",
      })),
    );
    chartRef.current = chart;
    seriesRef.current = candles;
    linesRef.current = [];
    chart.timeScale().setVisibleLogicalRange({
      from: Math.max(-1, bars.length - 90),
      to: bars.length + 5,
    });
    const handleCrosshair = (parameter: MouseEventParams) => {
      const row = parameter.seriesData.get(candles);
      if (row && "open" in row) {
        setFocus({
          t: Number(parameter.time),
          o: row.open / multiplier,
          h: row.high / multiplier,
          l: row.low / multiplier,
          c: row.close / multiplier,
          v: 0,
        });
      } else setFocus(null);
    };
    chart.subscribeCrosshairMove(handleCrosshair);
    const refresh = () => {
      const range = chart.timeScale().getVisibleLogicalRange();
      if (range) {
        element.dataset.visibleFrom = String(range.from);
        element.dataset.visibleTo = String(range.to);
      }
      renderBand();
    };
    let refreshFrame = 0;
    const scheduleRefresh = () => {
      window.cancelAnimationFrame(refreshFrame);
      refreshFrame = window.requestAnimationFrame(refresh);
    };
    chart.timeScale().subscribeVisibleLogicalRangeChange(refresh);
    element.addEventListener("pointermove", scheduleRefresh, { passive: true });
    element.addEventListener("pointerup", scheduleRefresh, { passive: true });
    element.addEventListener("wheel", scheduleRefresh, { passive: true });
    const resize = new ResizeObserver(() =>
      window.requestAnimationFrame(refresh),
    );
    resize.observe(element);
    window.requestAnimationFrame(refresh);
    return () => {
      boundaryDragRef.current = null;
      setBoundaryDragging(null);
      window.cancelAnimationFrame(refreshFrame);
      element.removeEventListener("pointermove", scheduleRefresh);
      element.removeEventListener("pointerup", scheduleRefresh);
      element.removeEventListener("wheel", scheduleRefresh);
      resize.disconnect();
      chart.unsubscribeCrosshairMove(handleCrosshair);
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
      linesRef.current = [];
    };
  }, [bars, multiplier, chartUnit, pool.id]);
  useEffect(() => {
    const series = seriesRef.current;
    if (!series) return;
    for (const line of linesRef.current) series.removePriceLine(line);
    linesRef.current = [
      series.createPriceLine({
        price: lowerPrice * multiplier,
        color: "#9e85ea",
        lineWidth: 1,
        lineStyle: LineStyle.Dashed,
        axisLabelVisible: false,
        title: "Min",
      }),
      series.createPriceLine({
        price: upperPrice * multiplier,
        color: "#59b7c9",
        lineWidth: 1,
        lineStyle: LineStyle.Dashed,
        axisLabelVisible: false,
        title: "Max",
      }),
    ];
    series.applyOptions({
      autoscaleInfoProvider: (original: () => AutoscaleInfo | null) => {
        const info = original();
        return info?.priceRange
          ? {
              ...info,
              priceRange: {
                minValue:
                  Math.min(info.priceRange.minValue, lowerPrice * multiplier) *
                  0.999,
                maxValue:
                  Math.max(info.priceRange.maxValue, upperPrice * multiplier) *
                  1.001,
              },
            }
          : null;
      },
    });
    const frame = window.requestAnimationFrame(renderBand);
    return () => window.cancelAnimationFrame(frame);
  }, [lowerPrice, upperPrice, multiplier, bars]);
  useEffect(() => {
    if (!chartRef.current || !bars.length) return;
    chartRef.current.timeScale().setVisibleLogicalRange({
      from: Math.max(-1, bars.length - 90),
      to: bars.length + 5,
    });
  }, [resetKey]);
  const current = focus || bars.at(-1);
  return (
    <div
      className="pt-candle-chart"
      data-history-source={history?.source || ""}
      style={
        userChartHeight === null
          ? undefined
          : ({
              "--user-chart-height": `${userChartHeight}px`,
            } as CSSProperties)
      }
    >
      <div className="pt-ohlc">
        <span>
          {pool.symbol} / USD <small>{timeframe.toLowerCase()}</small>
        </span>
        {current && (
          <>
            <span>
              O <b>{chartPrice(current.o * multiplier)}</b>
            </span>
            <span>
              H <b>{chartPrice(current.h * multiplier)}</b>
            </span>
            <span>
              L <b>{chartPrice(current.l * multiplier)}</b>
            </span>
            <span className={current.c >= current.o ? "positive" : "negative"}>
              C <b>{chartPrice(current.c * multiplier)}</b>
            </span>
          </>
        )}
      </div>
      <div className="pt-chart-stage">
        <div
          ref={canvasRef}
          id={canvasId}
          className="pt-chart-canvas"
          role="group"
          aria-label={`${pool.pair} ${chartUnit === "MCap" ? "market cap" : "price"} chart, ${timeframe}`}
          aria-describedby={descriptionId}
          data-range-min={lowerPrice}
          data-range-max={upperPrice}
        />
        {band && bars.length > 0 && (
          <>
            <div
              className="pt-chart-selected-band"
              style={{ top: band.top, height: band.height }}
              aria-hidden="true"
            />
            {(["lower", "upper"] as const).map((edge) => {
              const isLower = edge === "lower";
              const value = isLower ? lowerBin : upperBin;
              const offscreen = isLower
                ? band.lowerOffscreen
                : band.upperOffscreen;
              return (
                <button
                  key={edge}
                  type="button"
                  role="slider"
                  aria-label={
                    isLower ? "Minimum chart price" : "Maximum chart price"
                  }
                  aria-describedby={boundaryHintId}
                  aria-orientation="vertical"
                  aria-valuemin={isLower ? -80 : lowerBin + 1}
                  aria-valuemax={isLower ? upperBin - 1 : 80}
                  aria-valuenow={value}
                  aria-valuetext={`${chartPrice((isLower ? lowerPrice : upperPrice) * multiplier)} USD${chartUnit === "MCap" ? " market cap" : ""}; bin ${value}${offscreen ? "; outside the visible price scale" : ""}`}
                  className={`pt-chart-boundary ${isLower ? "is-lower" : "is-upper"} ${boundaryDragging === edge ? "is-dragging" : ""}`}
                  style={{
                    top: isLower ? band.lowerY : band.upperY,
                    right:
                      isLower && Math.abs(band.lowerY - band.upperY) < 44
                        ? 104
                        : 0,
                  }}
                  data-offscreen={offscreen || undefined}
                  title={`${isLower ? "Minimum" : "Maximum"} boundary · drag vertically or use arrow keys${offscreen ? " · outside visible price scale" : ""}`}
                  disabled={
                    boundaryDragging !== null && boundaryDragging !== edge
                  }
                  onPointerDown={(event) => beginBoundaryDrag(event, edge)}
                  onPointerMove={moveBoundaryDrag}
                  onPointerUp={(event) => {
                    if (boundaryDragRef.current?.pointerId === event.pointerId)
                      finishBoundaryDrag(event.currentTarget);
                  }}
                  onPointerCancel={(event) => {
                    if (boundaryDragRef.current?.pointerId === event.pointerId)
                      finishBoundaryDrag(event.currentTarget, true);
                  }}
                  onLostPointerCapture={(event) => {
                    if (boundaryDragRef.current?.pointerId === event.pointerId)
                      finishBoundaryDrag(event.currentTarget, true);
                  }}
                  onKeyDown={(event) => boundaryKeyboard(event, edge)}
                >
                  <span className="pt-chart-boundary-label">
                    <span>{isLower ? "Min" : "Max"}</span>
                    <strong>
                      {chartPrice(
                        (isLower ? lowerPrice : upperPrice) * multiplier,
                      )}
                    </strong>
                    <span aria-hidden="true">↕</span>
                  </span>
                </button>
              );
            })}
          </>
        )}
        {!history && !error && (
          <div className="pt-chart-loading">Loading chart</div>
        )}
        {error && (
          <div className="pt-chart-loading">
            <span>{error}</span>
            <button onClick={() => setRetry((value) => value + 1)}>
              Retry
            </button>
          </div>
        )}
      </div>
      <span className="bin-range-sr-only" id={boundaryHintId}>
        Drag a price marker vertically to adjust its liquidity boundary. Arrow
        up increases the price by one bin; arrow down decreases it. Hold Shift
        for ten bins. Home and End select the available limits. Escape cancels a
        drag.
      </span>
      <div
        className={`pt-chart-resize ${chartResizing ? "is-dragging" : ""}`}
        role="separator"
        aria-label="Resize price chart"
        aria-orientation="horizontal"
        aria-controls={canvasId}
        aria-describedby={resizeHintId}
        aria-valuemin={340}
        aria-valuemax={1000}
        aria-valuenow={observedChartHeight}
        aria-valuetext={`${observedChartHeight} pixels high`}
        tabIndex={0}
        onPointerDown={(event) => {
          if (event.button !== 0 || chartResizeRef.current) return;
          event.preventDefault();
          chartResizeRef.current = {
            pointerId: event.pointerId,
            startY: event.clientY,
            startHeight: canvasRef.current?.clientHeight || observedChartHeight,
            previousHeight: userChartHeight,
          };
          event.currentTarget.focus({ preventScroll: true });
          event.currentTarget.setPointerCapture(event.pointerId);
          setChartResizing(true);
        }}
        onPointerMove={(event) => {
          const drag = chartResizeRef.current;
          if (!drag || drag.pointerId !== event.pointerId) return;
          event.preventDefault();
          setUserChartHeight(
            clampChartHeight(drag.startHeight + event.clientY - drag.startY),
          );
        }}
        onPointerUp={(event) => {
          if (chartResizeRef.current?.pointerId === event.pointerId)
            finishChartResize(event.currentTarget);
        }}
        onPointerCancel={(event) => {
          if (chartResizeRef.current?.pointerId === event.pointerId)
            finishChartResize(event.currentTarget, true);
        }}
        onLostPointerCapture={(event) => {
          const drag = chartResizeRef.current;
          if (!drag || drag.pointerId !== event.pointerId) return;
          chartResizeRef.current = null;
          setChartResizing(false);
          setUserChartHeight(drag.previousHeight);
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape" && chartResizeRef.current) {
            event.preventDefault();
            event.stopPropagation();
            finishChartResize(event.currentTarget, true);
            return;
          }
          const currentHeight =
            canvasRef.current?.clientHeight || observedChartHeight;
          const step = event.shiftKey ? 80 : 24;
          const next =
            event.key === "ArrowUp"
              ? currentHeight - step
              : event.key === "ArrowDown"
                ? currentHeight + step
                : event.key === "Home"
                  ? 340
                  : event.key === "End"
                    ? 1000
                    : null;
          if (next !== null) {
            event.preventDefault();
            setUserChartHeight(clampChartHeight(next));
          }
        }}
      >
        <span aria-hidden="true" />
      </div>
      <p id={resizeHintId} className="bin-range-sr-only">
        Drag to resize the chart. Up and Down adjust by 24 pixels, or 80 with
        Shift. Home sets 340 pixels; End sets 1000. Escape cancels a drag.
      </p>
      <div className="pt-chart-source">
        <span>{history?.source || "Price / USD"}</span>
        <span>
          {history?.updatedAt
            ? new Date(history.updatedAt).toLocaleString("en-GB", {
                day: "2-digit",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "Asia/Ho_Chi_Minh",
              }) + " GMT+7"
            : ""}
        </span>
      </div>
      <p className="bin-range-sr-only" id={descriptionId}>
        {bars.length
          ? `Latest close ${chartPrice(bars[bars.length - 1].c * multiplier)} USD. Open View chart data below for the latest five candles in a table.`
          : "Chart data is loading or unavailable."}
      </p>
      {bars.length > 0 && (
        <details className="pt-chart-data">
          <summary>
            View chart data <ChevronDown size={13} aria-hidden="true" />
          </summary>
          <div
            className="pt-chart-data-scroll"
            tabIndex={0}
            role="region"
            aria-label="Recent candle data"
          >
            <table>
              <caption>
                Latest {Math.min(5, bars.length)} {timeframe} candles ·{" "}
                {chartUnit === "MCap" ? "Market cap" : "Price"} in USD
              </caption>
              <thead>
                <tr>
                  <th scope="col">Time (UTC)</th>
                  <th scope="col">Open</th>
                  <th scope="col">High</th>
                  <th scope="col">Low</th>
                  <th scope="col">Close</th>
                  <th scope="col">Volume (USD)</th>
                </tr>
              </thead>
              <tbody>
                {bars
                  .slice(-5)
                  .reverse()
                  .map((bar) => (
                    <tr key={bar.t}>
                      <th scope="row">
                        <time dateTime={new Date(bar.t * 1000).toISOString()}>
                          {new Date(bar.t * 1000).toLocaleString("en-GB", {
                            month: "short",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            timeZone: "UTC",
                          })}
                        </time>
                      </th>
                      {[bar.o, bar.h, bar.l, bar.c].map((value, index) => (
                        <td key={index}>{chartPrice(value * multiplier)}</td>
                      ))}
                      <td>{formatMoney(bar.v)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </details>
      )}
    </div>
  );
}

function ActivityRow({ event }: { event: ActivityEvent }) {
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
          {formatMoney(event.amount)} {event.token}
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

type BinRangeControlProps = {
  price: number;
  unitLabel?: string;
  binStep?: number;
  lowerBin: number;
  upperBin: number;
  shape: string;
  side: "fifty_fifty" | "base" | "quote";
  onRangeChange: (lower: number, upper: number) => void;
};

const RANGE_FIRST_BIN = -80;
const RANGE_LAST_BIN = 80;

function binControlClamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

function binControlPriceFormat(value: number) {
  if (!Number.isFinite(value) || value === 0) return "0";
  const magnitude = Math.abs(value);
  const decimals =
    magnitude >= 1000
      ? 2
      : magnitude >= 1
        ? 4
        : Math.min(20, Math.ceil(-Math.log10(magnitude)) + 5);
  return new Intl.NumberFormat("en-US", {
    useGrouping: false,
    minimumFractionDigits: 0,
    maximumFractionDigits: Math.max(0, decimals),
  }).format(value);
}

function binControlPercent(value: number) {
  return `${value > 0 ? "+" : ""}${new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: false,
  }).format(value)}%`;
}

/**
 * Prices are exact DLMM bin prices: activePrice * (1 + binStep / 10000)^bin.
 * The selected distribution includes both edge bins; -35..34 is 70 bins.
 * The caller owns values; dragging, keyboard and fields all emit the same bins.
 */
function BinRangeControl({
  price,
  unitLabel = "quote units per base token",
  binStep = 20,
  lowerBin,
  upperBin,
  shape,
  side,
  onRangeChange,
}: BinRangeControlProps) {
  const titleId = useId();
  const trackRef = useRef<HTMLDivElement>(null);
  const lowerRef = useRef<HTMLButtonElement>(null);
  const upperRef = useRef<HTMLButtonElement>(null);
  const dragRef = useRef<{ pointerId: number; edge: "lower" | "upper" } | null>(
    null,
  );
  const [dragging, setDragging] = useState<"lower" | "upper" | null>(null);
  const lower = binControlClamp(
    Number.isFinite(lowerBin) ? Math.round(lowerBin) : -35,
    RANGE_FIRST_BIN,
    RANGE_LAST_BIN - 1,
  );
  const upper = binControlClamp(
    Number.isFinite(upperBin) ? Math.round(upperBin) : 35,
    lower + 1,
    RANGE_LAST_BIN,
  );
  const rangeRef = useRef({ lower, upper });
  rangeRef.current = { lower, upper };
  const step = Number.isFinite(binStep) && binStep > 0 ? binStep : 20;
  const rate = 1 + step / 10000;
  const activePrice = Number.isFinite(price) && price > 0 ? price : 0;
  const priceAtBin = (bin: number) => activePrice * Math.pow(rate, bin);
  const fractionAtBin = (bin: number) =>
    (bin - RANGE_FIRST_BIN) / (RANGE_LAST_BIN - RANGE_FIRST_BIN);

  const publish = (edge: "lower" | "upper", requested: number) => {
    const current = rangeRef.current;
    const next =
      edge === "lower"
        ? {
            lower: binControlClamp(
              Math.round(requested),
              RANGE_FIRST_BIN,
              current.upper - 1,
            ),
            upper: current.upper,
          }
        : {
            lower: current.lower,
            upper: binControlClamp(
              Math.round(requested),
              current.lower + 1,
              RANGE_LAST_BIN,
            ),
          };
    rangeRef.current = next;
    if (next.lower !== current.lower || next.upper !== current.upper)
      onRangeChange(next.lower, next.upper);
    return edge === "lower" ? next.lower : next.upper;
  };

  const binAtPointer = (clientX: number) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect || rect.width <= 0) return 0;
    const fraction = binControlClamp((clientX - rect.left) / rect.width, 0, 1);
    return Math.round(
      RANGE_FIRST_BIN + fraction * (RANGE_LAST_BIN - RANGE_FIRST_BIN),
    );
  };

  const beginDrag = (
    event: RangePointerEvent<HTMLElement>,
    edge?: "lower" | "upper",
  ) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    const candidate = binAtPointer(event.clientX);
    const current = rangeRef.current;
    // The hit boxes overlap when the range is narrow. Select the nearer grip.
    const closest =
      Math.abs(candidate - current.lower) < Math.abs(candidate - current.upper)
        ? "lower"
        : "upper";
    const selected =
      edge && Math.abs(current.upper - current.lower) > 8 ? edge : closest;
    dragRef.current = { pointerId: event.pointerId, edge: selected };
    setDragging(selected);
    (selected === "lower" ? lowerRef.current : upperRef.current)?.focus({
      preventScroll: true,
    });
    event.currentTarget.setPointerCapture(event.pointerId);
    publish(selected, candidate);
  };

  const moveDrag = (event: RangePointerEvent<HTMLElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    event.preventDefault();
    publish(drag.edge, binAtPointer(event.clientX));
  };

  const finishDrag = (event: RangePointerEvent<HTMLElement>) => {
    if (dragRef.current?.pointerId !== event.pointerId) return;
    dragRef.current = null;
    setDragging(null);
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const keyboard = (
    event: RangeKeyboardEvent<HTMLElement>,
    edge: "lower" | "upper",
  ) => {
    const current = rangeRef.current;
    const value = current[edge];
    const increment = event.shiftKey ? 10 : 1;
    const next =
      event.key === "ArrowLeft" || event.key === "ArrowDown"
        ? value - increment
        : event.key === "ArrowRight" || event.key === "ArrowUp"
          ? value + increment
          : event.key === "Home"
            ? edge === "lower"
              ? RANGE_FIRST_BIN
              : current.lower + 1
            : event.key === "End"
              ? edge === "lower"
                ? current.upper - 1
                : RANGE_LAST_BIN
              : null;
    if (next === null) return;
    event.preventDefault();
    publish(edge, next);
  };

  const commitPrice = (edge: "lower" | "upper", raw: string) => {
    const typed = Number(raw.replace(/[$,\s]/g, ""));
    if (!activePrice)
      return {
        value: binControlPriceFormat(priceAtBin(rangeRef.current[edge])),
        error: "Price data is unavailable",
      };
    if (!raw.trim() || !Number.isFinite(typed) || typed <= 0) {
      return {
        value: binControlPriceFormat(priceAtBin(rangeRef.current[edge])),
        error: "Enter a price above zero",
      };
    }
    const requested = Math.round(
      Math.log(typed / activePrice) / Math.log(rate),
    );
    const next = publish(edge, requested);
    return { value: binControlPriceFormat(priceAtBin(next)) };
  };

  const heightAtBin = (bin: number) => {
    const selected = bin >= lower && bin <= upper;
    if (!selected) return 2;
    const normalizedShape = shape.toLowerCase().replace(/[\s_-]/g, "");
    if (normalizedShape === "curve" && side === "fifty_fifty")
      return (
        88 *
        Math.max(
          0,
          1 - Math.abs(bin) / Math.max(1, Math.abs(lower), Math.abs(upper)),
        )
      );
    if (normalizedShape === "bidask" && side === "fifty_fifty")
      return (
        (88 * Math.abs(bin)) / Math.max(1, Math.abs(lower), Math.abs(upper))
      );
    return 76;
  };

  const binColor = (bin: number) =>
    side === "base"
      ? "var(--range-base, #8d69dd)"
      : side === "quote"
        ? "var(--range-quote, #38b5ca)"
        : bin < 0
          ? "var(--range-quote, #38b5ca)"
          : "var(--range-base, #8d69dd)";

  const pointerHandlers = {
    onPointerMove: moveDrag,
    onPointerUp: finishDrag,
    onPointerCancel: finishDrag,
    onLostPointerCapture: () => {
      dragRef.current = null;
      setDragging(null);
    },
  };

  return (
    <div className="bin-range-control" role="group" aria-labelledby={titleId}>
      <span className="bin-range-sr-only" id={titleId}>
        Liquidity price range
      </span>
      <span className="bin-range-sr-only" id={`${titleId}-help`}>
        Prices in {unitLabel}. Arrow keys adjust one bin. Hold Shift for ten
        bins. Home and End move to the available bounds.
      </span>
      <div className="bin-range-chart">
        <div
          className="bin-range-track"
          ref={trackRef}
          onPointerDown={(event) => beginDrag(event)}
          {...pointerHandlers}
        >
          <div className="bin-range-bars" aria-hidden="true">
            {Array.from(
              { length: RANGE_LAST_BIN - RANGE_FIRST_BIN + 1 },
              (_, index) => {
                const bin = RANGE_FIRST_BIN + index;
                const selected = bin >= lower && bin <= upper;
                return (
                  <span
                    key={bin}
                    data-bin={bin}
                    data-selected={selected ? "true" : "false"}
                    style={{
                      height: `${heightAtBin(bin)}%`,
                      backgroundColor: binColor(bin),
                      opacity: selected ? 0.95 : 0.28,
                    }}
                  />
                );
              },
            )}
          </div>
          <span className="bin-range-active-line" aria-hidden="true" />
          <button
            ref={lowerRef}
            type="button"
            role="slider"
            aria-label="Minimum price range"
            aria-describedby={`${titleId}-help`}
            aria-valuemin={RANGE_FIRST_BIN}
            aria-valuemax={upper - 1}
            aria-valuenow={lower}
            aria-valuetext={`${binControlPriceFormat(priceAtBin(lower))} ${unitLabel}, ${binControlPercent((Math.pow(rate, lower) - 1) * 100)}, bin ${lower}`}
            aria-orientation="horizontal"
            className={`bin-range-handle is-lower ${dragging === "lower" ? "is-dragging" : ""}`}
            style={{ left: `${fractionAtBin(lower) * 100}%` }}
            onPointerDown={(event) => beginDrag(event, "lower")}
            onKeyDown={(event) => keyboard(event, "lower")}
            {...pointerHandlers}
          >
            <span className="bin-range-handle-line" />
            <span className="bin-range-handle-knob">
              <i />
              <i />
            </span>
          </button>
          <button
            ref={upperRef}
            type="button"
            role="slider"
            aria-label="Maximum price range"
            aria-describedby={`${titleId}-help`}
            aria-valuemin={lower + 1}
            aria-valuemax={RANGE_LAST_BIN}
            aria-valuenow={upper}
            aria-valuetext={`${binControlPriceFormat(priceAtBin(upper))} ${unitLabel}, ${binControlPercent((Math.pow(rate, upper) - 1) * 100)}, bin ${upper}`}
            aria-orientation="horizontal"
            className={`bin-range-handle is-upper ${dragging === "upper" ? "is-dragging" : ""}`}
            style={{ left: `${fractionAtBin(upper) * 100}%` }}
            onPointerDown={(event) => beginDrag(event, "upper")}
            onKeyDown={(event) => keyboard(event, "upper")}
            {...pointerHandlers}
          >
            <span className="bin-range-handle-line" />
            <span className="bin-range-handle-knob">
              <i />
              <i />
            </span>
          </button>
        </div>
      </div>
      <div className="bin-range-axis" aria-hidden="true">
        <span>{binControlPriceFormat(priceAtBin(RANGE_FIRST_BIN))}</span>
        <span>{binControlPriceFormat(activePrice)}</span>
        <span>{binControlPriceFormat(priceAtBin(RANGE_LAST_BIN))}</span>
      </div>
      <div className="bin-range-fields">
        <BinControlPriceField
          label="Min price"
          value={priceAtBin(lower)}
          bin={lower}
          minBin={RANGE_FIRST_BIN}
          maxBin={upper - 1}
          unitLabel={unitLabel}
          onBinChange={(requested) => {
            const bin = publish("lower", requested);
            return { bin, value: binControlPriceFormat(priceAtBin(bin)) };
          }}
          percentage={(Math.pow(rate, lower) - 1) * 100}
          canDecrease={lower > RANGE_FIRST_BIN}
          canIncrease={lower < upper - 1}
          onCommit={(raw) => commitPrice("lower", raw)}
          onStep={(delta) =>
            binControlPriceFormat(
              priceAtBin(publish("lower", rangeRef.current.lower + delta)),
            )
          }
        />
        <BinControlPriceField
          label="Max price"
          value={priceAtBin(upper)}
          bin={upper}
          minBin={lower + 1}
          maxBin={RANGE_LAST_BIN}
          unitLabel={unitLabel}
          onBinChange={(requested) => {
            const bin = publish("upper", requested);
            return { bin, value: binControlPriceFormat(priceAtBin(bin)) };
          }}
          percentage={(Math.pow(rate, upper) - 1) * 100}
          canDecrease={upper > lower + 1}
          canIncrease={upper < RANGE_LAST_BIN}
          onCommit={(raw) => commitPrice("upper", raw)}
          onStep={(delta) =>
            binControlPriceFormat(
              priceAtBin(publish("upper", rangeRef.current.upper + delta)),
            )
          }
        />
      </div>
      <div className="bin-range-count">
        Total bins <output aria-live="polite">{upper - lower + 1}</output>
      </div>
    </div>
  );
}

function BinControlPriceField({
  label,
  value,
  bin,
  minBin,
  maxBin,
  unitLabel,
  onBinChange,
  percentage,
  canDecrease,
  canIncrease,
  onCommit,
  onStep,
}: {
  label: string;
  value: number;
  bin: number;
  minBin: number;
  maxBin: number;
  unitLabel: string;
  onBinChange: (bin: number) => { bin: number; value: string };
  percentage: number;
  canDecrease: boolean;
  canIncrease: boolean;
  onCommit: (raw: string) => { value: string; error?: string };
  onStep: (delta: number) => string;
}) {
  const id = useId();
  const [draft, setDraft] = useState(binControlPriceFormat(value));
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  const cancelRef = useRef(false);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startBin: number;
    needsBaseline: boolean;
  } | null>(null);
  const controlsRef = useRef({ bin, minBin, maxBin, onBinChange });
  controlsRef.current = { bin, minBin, maxBin, onBinChange };
  const formatted = binControlPriceFormat(value);
  useEffect(() => {
    if (!focused) setDraft(formatted);
  }, [formatted, focused]);
  const stepField = (delta: number) => {
    setDraft(onStep(delta));
    setError("");
  };
  const setDragBin = (requested: number) => {
    const controls = controlsRef.current;
    const result = controls.onBinChange(
      binControlClamp(Math.round(requested), controls.minBin, controls.maxBin),
    );
    controls.bin = result.bin;
    setDraft(result.value);
    setError("");
  };
  const finishDrag = (element: HTMLButtonElement, cancelled = false) => {
    const drag = dragRef.current;
    if (!drag) return;
    const initialBin = drag.needsBaseline
      ? controlsRef.current.bin
      : drag.startBin;
    dragRef.current = null;
    setDragging(false);
    if (cancelled) setDragBin(initialBin);
    if (element.hasPointerCapture(drag.pointerId))
      element.releasePointerCapture(drag.pointerId);
  };

  return (
    <div className="bin-price-field">
      <div className="bin-price-heading">
        <label htmlFor={id}>{label}</label>
        <button
          type="button"
          role="slider"
          aria-label={
            label === "Min price" ? "Drag minimum price" : "Drag maximum price"
          }
          aria-orientation="horizontal"
          aria-valuemin={minBin}
          aria-valuemax={maxBin}
          aria-valuenow={bin}
          aria-valuetext={`${formatted} ${unitLabel}, bin ${bin}`}
          aria-describedby={`${id}-drag-help`}
          title="Drag left or right to adjust price"
          className={`bin-price-drag ${dragging ? "is-dragging" : ""}`}
          onPointerDown={(event) => {
            if (
              (event.pointerType === "mouse" && event.button !== 0) ||
              dragRef.current
            )
              return;
            event.preventDefault();
            event.stopPropagation();
            event.currentTarget.focus({ preventScroll: true });
            dragRef.current = {
              pointerId: event.pointerId,
              startX: event.clientX,
              startBin: controlsRef.current.bin,
              needsBaseline: true,
            };
            event.currentTarget.setPointerCapture(event.pointerId);
            setDragging(true);
          }}
          onPointerMove={(event) => {
            const drag = dragRef.current;
            if (!drag || drag.pointerId !== event.pointerId) return;
            event.preventDefault();
            if (drag.needsBaseline) {
              drag.startBin = controlsRef.current.bin;
              drag.needsBaseline = false;
            }
            setDragBin(
              drag.startBin + Math.round((event.clientX - drag.startX) / 4),
            );
          }}
          onPointerUp={(event) => {
            if (dragRef.current?.pointerId === event.pointerId)
              finishDrag(event.currentTarget);
          }}
          onPointerCancel={(event) => {
            if (dragRef.current?.pointerId === event.pointerId)
              finishDrag(event.currentTarget, true);
          }}
          onLostPointerCapture={(event) => {
            if (dragRef.current?.pointerId === event.pointerId)
              finishDrag(event.currentTarget, true);
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape" && dragRef.current) {
              event.preventDefault();
              event.stopPropagation();
              finishDrag(event.currentTarget, true);
              return;
            }
            const controls = controlsRef.current;
            const increment = event.shiftKey ? 10 : 1;
            const next =
              event.key === "ArrowLeft" || event.key === "ArrowDown"
                ? controls.bin - increment
                : event.key === "ArrowRight" || event.key === "ArrowUp"
                  ? controls.bin + increment
                  : event.key === "Home"
                    ? controls.minBin
                    : event.key === "End"
                      ? controls.maxBin
                      : null;
            if (next !== null) {
              event.preventDefault();
              setDragBin(next);
            }
          }}
        >
          <Menu size={12} aria-hidden="true" />
          <span>Drag</span>
        </button>
      </div>
      <span className="bin-range-sr-only" id={`${id}-drag-help`}>
        Drag left or right to change price by one bin every four pixels. Arrow
        keys change one bin, Shift changes ten, Home and End move to the
        available bounds. Escape cancels a drag.
      </span>
      <div className="bin-price-input-row">
        <button
          type="button"
          aria-label={`Decrease ${label.toLowerCase()} by one bin`}
          disabled={!canDecrease}
          onClick={() => stepField(-1)}
        >
          <Minus size={12} strokeWidth={1.5} />
        </button>
        <input
          id={id}
          type="text"
          inputMode="decimal"
          spellCheck={false}
          autoComplete="off"
          aria-label={label === "Min price" ? "Minimum price" : "Maximum price"}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          value={draft}
          maxLength={32}
          onFocus={() => setFocused(true)}
          onChange={(event) => {
            setDraft(event.target.value);
            setError("");
          }}
          onBlur={() => {
            setFocused(false);
            if (cancelRef.current) {
              cancelRef.current = false;
              setDraft(formatted);
              setError("");
              return;
            }
            const result = onCommit(draft);
            setDraft(result.value);
            setError(result.error || "");
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              event.currentTarget.blur();
            } else if (event.key === "Escape") {
              event.preventDefault();
              cancelRef.current = true;
              setDraft(formatted);
              event.currentTarget.blur();
            } else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
              event.preventDefault();
              stepField(
                (event.key === "ArrowUp" ? 1 : -1) * (event.shiftKey ? 10 : 1),
              );
            }
          }}
        />
        <button
          type="button"
          aria-label={`Increase ${label.toLowerCase()} by one bin`}
          disabled={!canIncrease}
          onClick={() => stepField(1)}
        >
          <Plus size={12} strokeWidth={1.5} />
        </button>
      </div>
      <span
        className={`bin-price-change ${percentage < 0 ? "is-negative" : "is-positive"}`}
      >
        {binControlPercent(percentage)}
      </span>
      {error && (
        <span className="bin-price-error" id={`${id}-error`} role="status">
          {error}
        </span>
      )}
    </div>
  );
}

/** The original fee geometry: a 20px thumb center travels from x=10 to width-10. */
function FeeControl({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  const id = useId();
  const sliderRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<number | null>(null);
  const current = binControlClamp(
    Number.isFinite(value) ? Math.round(value) : 10,
    5,
    25,
  );
  const valueRef = useRef(current);
  valueRef.current = current;
  const [dragging, setDragging] = useState(false);
  const fraction = (current - 5) / 20;
  const publish = (next: number) => {
    const normalized = binControlClamp(Math.round(next), 5, 25);
    if (normalized !== valueRef.current) {
      valueRef.current = normalized;
      onChange(normalized);
    }
  };
  const valueAtPointer = (clientX: number) => {
    const rect = sliderRef.current?.getBoundingClientRect();
    if (!rect) return current;
    const ratio = binControlClamp(
      (clientX - rect.left - 10) / Math.max(1, rect.width - 20),
      0,
      1,
    );
    return 5 + ratio * 20;
  };
  const finishDrag = (event: RangePointerEvent<HTMLDivElement>) => {
    if (dragRef.current !== event.pointerId) return;
    dragRef.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
  };
  return (
    <div className="fee-control">
      <label id={`${id}-label`}>Social LP profit</label>
      <p id={`${id}-help`}>
        % of followers’ profits you earn
        <span className="bin-range-sr-only">
          . Use arrow keys to adjust by one percent, or five percent with Shift.
          Home sets five percent; End sets twenty-five percent.
        </span>
      </p>
      <div
        ref={sliderRef}
        className={`fee-slider ${dragging ? "is-dragging" : ""}`}
        role="slider"
        tabIndex={0}
        aria-labelledby={`${id}-label`}
        aria-describedby={`${id}-help`}
        aria-valuemin={5}
        aria-valuemax={25}
        aria-valuenow={current}
        aria-valuetext={`${current}%`}
        aria-orientation="horizontal"
        onPointerDown={(event) => {
          if (event.pointerType === "mouse" && event.button !== 0) return;
          event.preventDefault();
          dragRef.current = event.pointerId;
          setDragging(true);
          event.currentTarget.focus({ preventScroll: true });
          event.currentTarget.setPointerCapture(event.pointerId);
          publish(valueAtPointer(event.clientX));
        }}
        onPointerMove={(event) => {
          if (dragRef.current === event.pointerId) {
            event.preventDefault();
            publish(valueAtPointer(event.clientX));
          }
        }}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onLostPointerCapture={() => {
          dragRef.current = null;
          setDragging(false);
        }}
        onKeyDown={(event) => {
          const delta = event.shiftKey ? 5 : 1;
          const next =
            event.key === "ArrowLeft" || event.key === "ArrowDown"
              ? valueRef.current - delta
              : event.key === "ArrowRight" || event.key === "ArrowUp"
                ? valueRef.current + delta
                : event.key === "Home"
                  ? 5
                  : event.key === "End"
                    ? 25
                    : null;
          if (next !== null) {
            event.preventDefault();
            publish(next);
          }
        }}
      >
        <div className="fee-slider-rail">
          <span
            className="fee-slider-fill"
            style={{ width: `${fraction * 100}%` }}
          />
          <span
            className="fee-slider-thumb"
            style={{ left: `${fraction * 100}%` }}
          />
          <output
            style={{ left: `clamp(8px, ${fraction * 100}%, calc(100% - 8px))` }}
            aria-hidden="true"
          >
            {current}%
          </output>
        </div>
      </div>
      <div className="fee-slider-labels" aria-hidden="true">
        <span>5%</span>
        <span>25%</span>
      </div>
    </div>
  );
}

function PoolSearch({
  value,
  onChange,
  onSelectPool,
  onSelectCreator,
  inputRef,
  variant = "global",
  label,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  onSelectPool: (id: string) => void;
  onSelectCreator: (handle: string) => void;
  inputRef?: RefObject<HTMLInputElement | null>;
  variant?: "global" | "discover";
  label: string;
  placeholder: string;
}) {
  const id = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const localInputRef = useRef<HTMLInputElement>(null);
  const fieldRef = inputRef || localInputRef;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const term = value.trim().replace(/^@/, "").toLowerCase();
  const results = [
    ...MARKETS.filter((item) =>
      `${item.pair} ${item.symbol} ${item.address}`
        .toLowerCase()
        .includes(term),
    )
      .slice(0, 5)
      .map((item) => ({
        key: item.id,
        kind: "pool" as const,
        title: item.pair,
        description: `${item.category} · ${item.tvl} liquidity`,
        pool: item,
        avatar: "",
      })),
    ...CREATORS.filter((creator) => creator.toLowerCase().includes(term))
      .slice(0, 3)
      .map((creator) => ({
        key: creator,
        kind: "creator" as const,
        title: `@${creator}`,
        description: `${STRATEGIES.filter((item) => item.creator === creator).length} shared strategies`,
        pool: null,
        avatar:
          STRATEGIES.find((item) => item.creator === creator)?.avatar ||
          "/creators/default.svg",
      })),
  ];
  const selected = Math.min(active, Math.max(0, results.length - 1));
  const pick = (index: number) => {
    const item = results[index];
    if (!item) return;
    setOpen(false);
    if (item.kind === "pool") onSelectPool(item.key);
    else onSelectCreator(item.key);
  };
  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", outside, true);
    return () => document.removeEventListener("pointerdown", outside, true);
  }, [open]);
  useEffect(() => {
    if (open)
      document
        .getElementById(`${id}-option-${selected}`)
        ?.scrollIntoView({ block: "nearest" });
  }, [open, selected, id]);
  return (
    <div className={`pt-search-combobox is-${variant}`} ref={wrapperRef}>
      <label
        className={
          variant === "global" ? "pt-global-search" : "pt-discover-search"
        }
      >
        <Search size={16} aria-hidden="true" />
        <input
          ref={fieldRef}
          value={value}
          role="combobox"
          aria-label={label}
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={open ? `${id}-listbox` : undefined}
          aria-activedescendant={
            open && results.length ? `${id}-option-${selected}` : undefined
          }
          aria-describedby={`${id}-hint`}
          placeholder={placeholder}
          autoComplete="off"
          spellCheck={false}
          onFocus={() => {
            setActive(0);
            setOpen(true);
          }}
          onBlur={(event) => {
            if (!wrapperRef.current?.contains(event.relatedTarget as Node))
              setOpen(false);
          }}
          onChange={(event) => {
            onChange(event.target.value);
            setActive(0);
            setOpen(true);
          }}
          onKeyDown={(event) => {
            if (
              (event.ctrlKey || event.metaKey) &&
              event.key.toLowerCase() === "k"
            ) {
              setOpen(true);
              return;
            }
            if (event.key === "Escape") {
              event.preventDefault();
              event.stopPropagation();
              setOpen(false);
            } else if (event.key === "Tab") setOpen(false);
            else if (
              (event.key === "ArrowDown" || event.key === "ArrowUp") &&
              results.length
            ) {
              event.preventDefault();
              setOpen(true);
              setActive(
                open
                  ? (selected +
                      (event.key === "ArrowDown" ? 1 : results.length - 1)) %
                      results.length
                  : event.key === "ArrowDown"
                    ? 0
                    : results.length - 1,
              );
            } else if (
              open &&
              (event.key === "Home" || event.key === "End") &&
              results.length
            ) {
              event.preventDefault();
              setActive(event.key === "Home" ? 0 : results.length - 1);
            } else if (open && event.key === "Enter" && results.length) {
              event.preventDefault();
              pick(selected);
            }
          }}
        />
        {variant === "global" && <kbd>⌘ K</kbd>}
      </label>
      <span className="bin-range-sr-only" id={`${id}-hint`}>
        Use arrow keys to review suggestions, Enter to open one, and Escape to
        close.
      </span>
      {open && (
        <div className="pt-search-menu">
          <div className="pt-search-menu-heading">
            Quick search <span aria-hidden="true">↑ ↓ Enter</span>
          </div>
          <div
            role="listbox"
            id={`${id}-listbox`}
            aria-label="Search suggestions"
          >
            {results.map((item, index) => (
              <button
                key={`${item.kind}-${item.key}`}
                type="button"
                role="option"
                id={`${id}-option-${index}`}
                aria-selected={selected === index}
                tabIndex={-1}
                className={`pt-search-option ${selected === index ? "is-active" : ""}`}
                onPointerDown={(event) => {
                  if (event.pointerType === "mouse") event.preventDefault();
                }}
                onMouseMove={() => setActive(index)}
                onClick={() => pick(index)}
              >
                {item.pool ? (
                  <TokenPair pool={item.pool} />
                ) : (
                  <img className="pt-search-avatar" src={item.avatar} alt="" />
                )}
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.description}</small>
                </span>
                <span className="pt-search-kind">
                  {item.kind === "pool" ? "Pool" : "Creator"}
                </span>
              </button>
            ))}
          </div>
          {!results.length && (
            <div className="pt-search-no-results" role="status">
              No pools or creators found
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function BrandSelect({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  const generatedId = useId();
  const triggerId = id || `${generatedId}-trigger`;
  const listboxId = `${triggerId}-options`;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const typeaheadRef = useRef({ text: "", time: 0 });
  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  );
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(selectedIndex);
  const [position, setPosition] = useState({
    left: 8,
    top: 8,
    width: 120,
    maxHeight: 280,
  });

  const measurePosition = (
    desiredHeight = Math.min(280, options.length * 44 + 8),
  ) => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return position;
    const width = Math.min(Math.max(rect.width, 120), window.innerWidth - 16);
    const below = window.innerHeight - rect.bottom - 8;
    const above = rect.top - 8;
    const flip = below < desiredHeight && above > below;
    const maxHeight = Math.max(44, Math.min(280, (flip ? above : below) - 6));
    return {
      left: Math.max(8, Math.min(rect.left, window.innerWidth - width - 8)),
      top: flip
        ? Math.max(8, rect.top - 6 - Math.min(desiredHeight, maxHeight))
        : rect.bottom + 6,
      width,
      maxHeight,
    };
  };
  const openMenu = (index = selectedIndex) => {
    if (!options.length) return;
    setPosition(measurePosition());
    setActiveIndex(index);
    setOpen(true);
  };
  const selectOption = (index: number) => {
    const option = options[index];
    if (!option) return;
    onChange(option.value);
    setOpen(false);
    triggerRef.current?.focus({ preventScroll: true });
  };

  useLayoutEffect(() => {
    if (!open) return;
    const reposition = () => {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (!rect || rect.bottom < 0 || rect.top > window.innerHeight) {
        setOpen(false);
        return;
      }
      setPosition(
        measurePosition(Math.min(menuRef.current?.scrollHeight || 280, 280)),
      );
    };
    reposition();
    window.addEventListener("resize", reposition);
    document.addEventListener("scroll", reposition, true);
    return () => {
      window.removeEventListener("resize", reposition);
      document.removeEventListener("scroll", reposition, true);
    };
  }, [open, options.length]);
  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        !triggerRef.current?.contains(target) &&
        !menuRef.current?.contains(target)
      )
        setOpen(false);
    };
    document.addEventListener("pointerdown", outside, true);
    return () => document.removeEventListener("pointerdown", outside, true);
  }, [open]);
  useEffect(() => {
    if (open)
      menuRef.current
        ?.querySelector<HTMLElement>(`[data-option-index="${activeIndex}"]`)
        ?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex]);

  return (
    <div className="brand-select">
      <button
        ref={triggerRef}
        id={triggerId}
        className="brand-select-trigger"
        type="button"
        role="combobox"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        aria-activedescendant={open ? `${listboxId}-${activeIndex}` : undefined}
        disabled={!options.length}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={(event) => {
          if (event.altKey || event.ctrlKey || event.metaKey) return;
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            if (!open) openMenu();
            else
              setActiveIndex((current) =>
                Math.max(
                  0,
                  Math.min(
                    options.length - 1,
                    current + (event.key === "ArrowDown" ? 1 : -1),
                  ),
                ),
              );
          } else if (event.key === "Home" || event.key === "End") {
            event.preventDefault();
            const index = event.key === "Home" ? 0 : options.length - 1;
            if (!open) openMenu(index);
            else setActiveIndex(index);
          } else if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            if (open) selectOption(activeIndex);
            else openMenu();
          } else if (event.key === "Escape" && open) {
            event.preventDefault();
            event.stopPropagation();
            setOpen(false);
          } else if (event.key === "Tab") {
            setOpen(false);
          } else if (event.key.length === 1 && /\S/.test(event.key)) {
            event.preventDefault();
            const now = Date.now();
            const previous = typeaheadRef.current;
            let text =
              now - previous.time < 700
                ? previous.text + event.key.toLowerCase()
                : event.key.toLowerCase();
            let index = options.findIndex((option) =>
              option.label.toLowerCase().startsWith(text),
            );
            if (index < 0) {
              text = event.key.toLowerCase();
              index = options.findIndex((_, offset) =>
                options[(activeIndex + offset + 1) % options.length].label
                  .toLowerCase()
                  .startsWith(text),
              );
              if (index >= 0)
                index = (activeIndex + index + 1) % options.length;
            }
            typeaheadRef.current = { text, time: now };
            if (index >= 0) {
              if (!open) openMenu(index);
              else setActiveIndex(index);
            }
          }
        }}
      >
        <span className="brand-select-value">
          {options.find((option) => option.value === value)?.label || value}
        </span>
        <ChevronDown size={14} aria-hidden="true" />
      </button>
      {open &&
        createPortal(
          <div
            ref={menuRef}
            id={listboxId}
            className="brand-select-menu"
            role="listbox"
            aria-label={`${label} options`}
            style={{ position: "fixed", ...position }}
          >
            {options.map((option, index) => (
              <div
                id={`${listboxId}-${index}`}
                key={option.value}
                className={`brand-select-option ${index === activeIndex ? "is-active" : ""} ${option.value === value ? "is-selected" : ""}`}
                role="option"
                aria-selected={option.value === value}
                data-option-index={index}
                onPointerDown={(event) => {
                  if (event.pointerType === "mouse") event.preventDefault();
                }}
                onPointerMove={() => setActiveIndex(index)}
                onClick={() => selectOption(index)}
              >
                <span>{option.label}</span>
                {option.value === value && (
                  <Check size={14} aria-hidden="true" />
                )}
              </div>
            ))}
          </div>,
          document.body,
        )}
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
