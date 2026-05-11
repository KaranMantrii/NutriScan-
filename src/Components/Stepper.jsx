import React, {
  useState,
  Children,
  useEffect
} from 'react';

import { motion, AnimatePresence } from 'motion/react';
import GlassSurface from './GlassSurface';

export default function Stepper({
  children,
  initialStep = 1,
  onStepChange = () => {},
  onFinalStepCompleted = () => {},
  stepCircleContainerClassName = '',
  stepContainerClassName = '',
  contentClassName = '',
  footerClassName = '',
  backButtonProps = {},
  nextButtonProps = {},
  backButtonText = 'Back',
  nextButtonText = 'Continue',
  disableStepIndicators = false,
  renderStepIndicator,
  ...rest
}) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [direction, setDirection] = useState(0);

  const stepsArray = Children.toArray(children);
  const totalSteps = stepsArray.length;

  const isCompleted = currentStep > totalSteps;

  const updateStep = (newStep) => {
    setCurrentStep(newStep);

    if (newStep > totalSteps) {
      onFinalStepCompleted();
    } else {
      onStepChange(newStep);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      updateStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    setDirection(1);

    if (currentStep < totalSteps) {
      updateStep(currentStep + 1);
    } else {
      updateStep(1);
    }
  };

  // AUTO PLAY
  useEffect(() => {
    const timeout = setTimeout(() => {
      handleNext();
    }, 5000);

    return () => clearTimeout(timeout);
  }, [currentStep]);

  return (
    <div
      className="flex min-h-full flex-1 items-center justify-center p-4"
      {...rest}
    >
      <GlassSurface
        displace={0.5}
        distortionScale={-180}
        redOffset={0}
        greenOffset={10}
        blueOffset={20}
        brightness={50}
        opacity={0.93}
        width={390}
        height={420}
        borderRadius={32}
        mixBlendMode="screen"
      >
        <div
          className={`relative flex h-[420px] w-[390px] flex-col overflow-hidden rounded-[32px]  shadow-2xl ${stepCircleContainerClassName}`}
        >
    

          {/* STEP INDICATORS */}
          <div
            className={`relative z-10 flex shrink-0 items-center px-8 pt-8 pb-6 ${stepContainerClassName}`}
          >
            {stepsArray.map((_, index) => {
              const stepNumber = index + 1;
              const isNotLastStep = index < totalSteps - 1;

              return (
                <React.Fragment key={stepNumber}>
                  {renderStepIndicator ? (
                    renderStepIndicator({
                      step: stepNumber,
                      currentStep,
                      onStepClick: (clicked) => {
                        setDirection(clicked > currentStep ? 1 : -1);
                        updateStep(clicked);
                      }
                    })
                  ) : (
                    <StepIndicator
                      step={stepNumber}
                      disableStepIndicators={disableStepIndicators}
                      currentStep={currentStep}
                      onClickStep={(clicked) => {
                        setDirection(clicked > currentStep ? 1 : -1);
                        updateStep(clicked);
                      }}
                    />
                  )}

                  {isNotLastStep && (
                    <StepConnector
                      isComplete={currentStep > stepNumber}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* STEP CONTENT */}
          <div className="relative z-10 flex-1 overflow-hidden min-h-0">
            <StepContentWrapper
              isCompleted={isCompleted}
              currentStep={currentStep}
              direction={direction}
              className={`h-full w-full ${contentClassName}`}
            >
              {stepsArray[currentStep - 1]}
            </StepContentWrapper>
          </div>

          {/* FOOTER */}
          {!isCompleted && (
            <div
              className={`relative z-10 shrink-0 px-6 pb-6 ${footerClassName}`}
            >
              <div
                className={`flex items-center ${
                  currentStep !== 1
                    ? 'justify-between'
                    : 'justify-end'
                }`}
              >
                {currentStep !== 1 && (
                  <button
                    onClick={handleBack}
                    className="rounded-lg px-2 py-1 text-xl text-neutral-400 transition hover:text-neutral-200"
                    {...backButtonProps}
                  >
                    {backButtonText}
                  </button>
                )}

                <button
                  onClick={handleNext}
                  className="flex items-center justify-center rounded-full bg-green-500 px-4 py-2 text-lg font-semibold text-white transition hover:scale-105 hover:bg-green-600 active:bg-green-700"
                  {...nextButtonProps}
                >
                  {nextButtonText}
                </button>
              </div>
            </div>
          )}
        </div>
      </GlassSurface>
    </div>
  );
}

function StepContentWrapper({
  isCompleted,
  currentStep,
  direction,
  children,
  className
}) {
  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
    >
      <AnimatePresence
        initial={false}
        mode="wait"
        custom={direction}
      >
        {!isCompleted && (
          <SlideTransition
            key={currentStep}
            direction={direction}
          >
            {children}
          </SlideTransition>
        )}
      </AnimatePresence>
    </div>
  );
}

function SlideTransition({
  children,
  direction
}) {
  return (
    <motion.div
      custom={direction}
      variants={stepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 26
      }}
      className="absolute left-0 top-0 w-full"
    >
      {children}
    </motion.div>
  );
}

const stepVariants = {
  enter: (dir) => ({
    x: dir >= 0 ? '100%' : '-100%',
    opacity: 0
  }),

  center: {
    x: '0%',
    opacity: 1
  },

  exit: (dir) => ({
    x: dir >= 0 ? '-20%' : '20%',
    opacity: 0
  })
};

export function Step({ children }) {
  return (
    <div className="flex h-full w-full flex-col items-start justify-start overflow-x-hidden px-8 py-3 text-left">

      <div className="w-full space-y-4 overflow-y-auto overflow-x-hidden pr-2 break-words">
        {children}
      </div>

    </div>
  );
}

function StepIndicator({
  step,
  currentStep,
  onClickStep,
  disableStepIndicators
}) {
  const status =
    currentStep === step
      ? 'active'
      : currentStep < step
      ? 'inactive'
      : 'complete';

  const handleClick = () => {
    if (
      step !== currentStep &&
      !disableStepIndicators
    ) {
      onClickStep(step);
    }
  };

  return (
    <motion.div
      onClick={handleClick}
      className={`relative ${
        disableStepIndicators
          ? 'pointer-events-none opacity-50'
          : 'cursor-pointer'
      }`}
      animate={status}
      initial={false}
    >
      <motion.div
        variants={{
          inactive: {
            backgroundColor: '#222',
            color: '#a3a3a3'
          },

          active: {
            backgroundColor: '#5227FF',
            color: '#5227FF'
          },

          complete: {
            backgroundColor: '#5227FF',
            color: '#3b82f6'
          }
        }}
        transition={{
          duration: 0.3
        }}
        className="flex h-8 w-8 items-center justify-center rounded-full font-semibold"
      >
        {status === 'complete' ? (
          <CheckIcon className="h-4 w-4 text-black" />
        ) : status === 'active' ? (
          <div className="h-3 w-3 rounded-full bg-[#120F17]" />
        ) : (
          <span className="text-sm">{step}</span>
        )}
      </motion.div>
    </motion.div>
  );
}

function StepConnector({ isComplete }) {
  return (
    <div className="relative mx-2 h-0.5 flex-1 overflow-hidden rounded bg-neutral-700">
      <motion.div
        className="absolute left-0 top-0 h-full bg-[#5227FF]"
        initial={false}
        animate={{
          width: isComplete ? '100%' : '0%'
        }}
        transition={{
          duration: 0.4
        }}
      />
    </div>
  );
}

function CheckIcon(props) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          delay: 0.1,
          type: 'tween',
          ease: 'easeOut',
          duration: 0.3
        }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}