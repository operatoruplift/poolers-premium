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
  useId,
  useRef,
  useMemo,
  type KeyboardEvent as RangeKeyboardEvent,
  type PointerEvent as RangePointerEvent,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
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
                Compare liquidity, volume, and fee tiers across Solana markets.
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
type TerminalModal =
  | null
  | { kind: "wallet" | "review" | "edit" | "reset" }
  | { kind: "join"; strategy: PoolStrategy }
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
  const [workspace, setWorkspace] = useState<Workspace>(readWorkspace);
  const [view, setView] = useState<"terminal" | "portfolio" | "profile">(() =>
    window.location.pathname.includes("portfolio")
      ? "portfolio"
      : window.location.pathname.endsWith("/profile")
        ? "profile"
        : "terminal",
  );
  const [selectedId, setSelectedId] = useState("stonk-sol");
  const [discovery, setDiscovery] = useState("Pools");
  const [category, setCategory] = useState("All");
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
  const [modal, setModal] = useState<TerminalModal>(null);
  const [modalAmount, setModalAmount] = useState("250");
  const [editName, setEditName] = useState("");
  const [editHandle, setEditHandle] = useState("");
  const [editBio, setEditBio] = useState("");
  const [toast, setToast] = useState("");
  const [mobilePanel, setMobilePanel] = useState("Market");
  const [positionFilter, setPositionFilter] = useState("All");
  const searchRef = useRef<HTMLInputElement>(null);
  const pendingWalletAction = useRef<TerminalModal>(null);
  const pool = MARKETS.find((item) => item.id === selectedId)!;
  const minRange = Number(
    ((Math.pow(1 + pool.binStep / 10000, lowerBin) - 1) * 100).toFixed(2),
  );
  const maxRange = Number(
    ((Math.pow(1 + pool.binStep / 10000, upperBin) - 1) * 100).toFixed(2),
  );
  const filteredPools = MARKETS.filter(
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
  const poolEvents = workspace.events.filter(
    (event) =>
      event.detail.includes(pool.pair) || event.detail.includes(pool.symbol),
  );
  const selectedStrategies = STRATEGIES.filter(
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
    setActivityTab("Strategies");
    setView("terminal");
    setMarketTab("Chart");
    setMobilePanel("Market");
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
  ): ActivityEvent => ({
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
        eventRecord("Created strategy", pool.pair, units, fundingToken),
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
        eventRecord("Joined strategy", strategy.title, modalValue, "USDC"),
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
      <header className="pt-topbar">
        <button className="pt-brand" onClick={onHome} aria-label="Poolers home">
          <BrandMark size={32} />
          <span>Poolers</span>
        </button>
        <label className="pt-global-search">
          <Search size={16} />
          <input
            ref={searchRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setView("terminal");
              setMobilePanel("Discover");
            }}
            placeholder="Pools, tokens, creators"
            aria-label="Search all pools"
          />
          <kbd>⌘ K</kbd>
        </label>
        <nav aria-label="Application navigation">
          <button
            className={view === "terminal" ? "active" : ""}
            onClick={() => setView("terminal")}
          >
            Terminal
          </button>
          <button
            className={view === "portfolio" ? "active" : ""}
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
          <div className={`pt-workspace show-${mobilePanel.toLowerCase()}`}>
            <aside className="pt-discovery">
              <div className="pt-discovery-tabs">
                {["Strategies", "Pools"].map((tab) => (
                  <button
                    key={tab}
                    className={discovery === tab ? "active" : ""}
                    onClick={() => setDiscovery(tab)}
                  >
                    {tab}
                  </button>
                ))}
                <button
                  className="pt-icon-button"
                  title="Reset filters"
                  aria-label="Reset discovery filters"
                  onClick={() => {
                    setQuery("");
                    setCategory("All");
                  }}
                >
                  <SlidersHorizontal size={16} />
                </button>
              </div>
              <label className="pt-discover-search">
                <Search size={16} />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search pools"
                  aria-label="Search mobile pools"
                />
              </label>
              {discovery === "Pools" ? (
                <>
                  <div className="pt-categories">
                    {["All", "Crypto", "Memes", "Stocks"].map((item) => (
                      <button
                        key={item}
                        className={category === item ? "active" : ""}
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
                <div className="pt-curated-list">
                  {STRATEGIES.filter((strategy) =>
                    `${strategy.title} ${strategy.creator} ${MARKETS.find((item) => item.id === strategy.poolId)?.pair}`
                      .toLowerCase()
                      .includes(query.toLowerCase()),
                  ).map((strategy) => (
                    <article key={strategy.id}>
                      <button
                        className="pt-strategy-discovery"
                        onClick={() => {
                          selectPool(strategy.poolId);
                          setActivityTab("Strategies");
                        }}
                      >
                        <TokenPair
                          pool={
                            MARKETS.find((item) => item.id === strategy.poolId)!
                          }
                        />
                        <span>
                          <strong>{strategy.title}</strong>
                          <small>
                            {strategy.creator} · {strategy.shape}
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
                    </article>
                  ))}
                </div>
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
                  <div className="pt-line-tabs">
                    {["Chart", "Details"].map((tab) => (
                      <button
                        key={tab}
                        className={marketTab === tab ? "active" : ""}
                        onClick={() => setMarketTab(tab)}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  <div className="pt-chart-settings">
                    <select
                      aria-label="Chart timeframe"
                      value={timeframe}
                      onChange={(event) => setTimeframe(event.target.value)}
                    >
                      <option value="5m">5m</option>
                      <option value="15m">15m</option>
                      <option value="1H">1h</option>
                      <option value="4H">4h</option>
                      <option value="1D">1d</option>
                    </select>
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
                  </div>
                </div>
                {marketTab === "Chart" ? (
                  <MarketCandles
                    pool={pool}
                    timeframe={timeframe}
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
                      onClick={() => setActivityTab("Strategies")}
                    >
                      Strategies
                    </button>
                    <button
                      className={activityTab === "History" ? "active" : ""}
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
                      workspace.events
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
                        onClick={() => setActivityTab("Strategies")}
                      >
                        All
                      </button>
                      <button
                        className={activityTab === "Yours" ? "active" : ""}
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
                            key={strategy.id}
                          >
                            <button
                              className="pt-strategy-author"
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
                              <span>{strategy.creator}</span>
                            </button>
                            <div className="pt-strategy-card-title">
                              <strong>{strategy.title}</strong>
                              <span>
                                {strategy.shape} · {strategy.members}{" "}
                                participants · {strategy.creatorFee || 10}%
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
                <span className="pt-side-switch" aria-label="Token allocation">
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
                        setSide(item.value as "fifty_fifty" | "base" | "quote");
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
            </aside>
          </div>
        </>
      ) : (
        <main className="pt-account-page">
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
                onClick={() => joinStrategy(modal.strategy)}
              >
                Join strategy <ArrowRight size={16} />
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
  lowerPrice,
  upperPrice,
  chartUnit,
  resetKey,
}: {
  pool: PoolMarket;
  timeframe: string;
  lowerPrice: number;
  upperPrice: number;
  chartUnit: string;
  resetKey: number;
}) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ReturnType<typeof createChart> | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const linesRef = useRef<IPriceLine[]>([]);
  const [history, setHistory] = useState<MarketHistory | null>(null);
  const [error, setError] = useState("");
  const [focus, setFocus] = useState<MarketBar | null>(null);
  const [retry, setRetry] = useState(0);
  const [band, setBand] = useState<{ top: number; height: number } | null>(
    null,
  );
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
    setBand({
      top,
      height: Math.max(0, Math.min(height, Math.max(lower, upper)) - top),
    });
  };
  useEffect(() => {
    const element = canvasRef.current;
    if (!element || !bars.length) return;
    const chart = createChart(element, {
      autoSize: true,
      layout: {
        background: { type: ColorType.Solid, color: "#101014" },
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
    chart.timeScale().subscribeVisibleLogicalRangeChange(refresh);
    const resize = new ResizeObserver(() =>
      window.requestAnimationFrame(refresh),
    );
    resize.observe(element);
    window.requestAnimationFrame(refresh);
    return () => {
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
        axisLabelVisible: true,
        title: "Min",
      }),
      series.createPriceLine({
        price: upperPrice * multiplier,
        color: "#59b7c9",
        lineWidth: 1,
        lineStyle: LineStyle.Dashed,
        axisLabelVisible: true,
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
          className="pt-chart-canvas"
          role="img"
          aria-label={`${pool.pair} ${chartUnit === "MCap" ? "market cap" : "price"} chart, ${timeframe}`}
          data-range-min={lowerPrice}
          data-range-max={upperPrice}
        />
        {band && bars.length > 0 && (
          <div
            className="pt-chart-selected-band"
            style={{ top: band.top, height: band.height }}
            aria-hidden="true"
          />
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
            aria-valuemin={RANGE_FIRST_BIN}
            aria-valuemax={upper - 1}
            aria-valuenow={lower}
            aria-valuetext={`${binControlPriceFormat(priceAtBin(lower))}, ${binControlPercent((Math.pow(rate, lower) - 1) * 100)}, bin ${lower}`}
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
            aria-valuemin={lower + 1}
            aria-valuemax={RANGE_LAST_BIN}
            aria-valuenow={upper}
            aria-valuetext={`${binControlPriceFormat(priceAtBin(upper))}, ${binControlPercent((Math.pow(rate, upper) - 1) * 100)}, bin ${upper}`}
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
  percentage,
  canDecrease,
  canIncrease,
  onCommit,
  onStep,
}: {
  label: string;
  value: number;
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
  const cancelRef = useRef(false);
  const formatted = binControlPriceFormat(value);
  useEffect(() => {
    if (!focused) setDraft(formatted);
  }, [formatted, focused]);
  const stepField = (delta: number) => {
    setDraft(onStep(delta));
    setError("");
  };

  return (
    <div className="bin-price-field">
      <label htmlFor={id}>{label}</label>
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
      <p>% of followers’ profits you earn</p>
      <div
        ref={sliderRef}
        className={`fee-slider ${dragging ? "is-dragging" : ""}`}
        role="slider"
        tabIndex={0}
        aria-labelledby={`${id}-label`}
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
