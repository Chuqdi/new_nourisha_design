import { Icon } from "@iconify/react/dist/iconify.js";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import Button from "../ui/Button";

const SingleQuestion = ({
  question,
  setActiveQuestion,
  activeQuestion,
  index,
}: {
  question: { question: string; answer: string };
  setActiveQuestion: (n: number) => void;
  activeQuestion: number;
  index: number;
}) => {
  const [showAnswer, setAnswer] = useState(false);
  return (
    <div
      onClick={() => {
        setAnswer(!showAnswer);
        setActiveQuestion(index);
      }}
      className="cursor-pointer flex flex-row p-[1.25rem] border-[2px] border-[#F2F4F7] rounded-[0.75rem] justify-between"
    >
      <div className="flex flex-col w-[90%]">
        <h5 className="text-black-900 font-inter text-[1.275rem] leading-[1.875rem] tracking-[-0.01875rem] font-bold">
          {question.question}
        </h5>
        {showAnswer && activeQuestion === index && (
          <AnimatePresence>
            <motion.p
              initial={{ y: 10 }}
              exit={{ y: 0 }}
              animate={{ y: 10 }}
              className="text-black-900 font-inter text-[1.175rem] leading-[1.875rem] tracking-[-0.01875rem]"
            >
              {question.answer}
            </motion.p>
          </AnimatePresence>
        )}
      </div>
      {showAnswer ? (
        <Icon icon="lucide:minus" className="w-6 h-6" />
      ) : (
        <Icon icon="mingcute:add-fill" className="w-6 h-6" />
      )}
    </div>
  );
};

export default function FaqSection() {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [moreLoaded, setMoreLoaded] = useState(false);
  const questions = [
    {
      question: "How long does delivery take?",
      answer:
        "Delivery takes between 24 hours to 48 hours depending on location.Your order needs to be placed before 12:00 pm of the previous day to be received within 24 hours.",
    },
    {
      question:
        "Can I choose to subscribe for the weekly or monthly plan this week and decide not to pay for a subscription plan the following week?",
      answer:
        "Most certainly. The subscription plan is not a compulsory Auto-renewal. However, if you choose to be on Auto-renewal, just click on the auto-renewal button displayed on the app.",
    },
    {
      question: "Do you deliver across all UK cities?",
      answer: "Yes, we deliver anywhere within the UK.",
    },
    {
      answer: `Yes, you can select your choice of meal selections from the available menu.
    The best part is you are not restricted to the available menu.`,
      question:
        "Do I get to select my preferred meals for the weekly subscription plan or there's already a selected meal that comes with the package?",
    },
    {
      question:
        "How does the weekly subscription plan work. Do you deliver each meal daily?",
      answer: "No, we do not.\n All 14 meals are delivered at once ",
    },
    {
      question:
        "How long should my weekly plan last in my fridge after receiving? ",
      answer: "Ideally 7-10 days.",
    },
    {
      question:
        "Can I select Nigerian and Ghanaian menus in my weekly subscription? ",
      answer: `No, you can’t make that selection with the weekly plan.\n
      You can either select a Nigerian or Ghanaian menu but not both. `,
    },
    {
      question:
        "I do not want to include swallows in my meal, just Soups and Jollof Rice. What can I get?",
      answer: "We have a Litres box available, 1.5LTR, 5LTR and 10LTR.",
    },
    {
      question:
        "Can I order just soups without the swallows and then replace the swallows with more soups?",
      answer: `The swallow is a complete package with the soups, and an exemption can be requested, however it can not be replaced with another meal.
      However, we also have bulk orders available where you can order for soup litres.`,
    },

    {
      question: "What days can I receive my order and are weekends inclusive? ",
      answer:
        "Deliveries are scheduled from Tuesdays - Fridays.Weekend delivery attracts an extra fee of £8.",
    },

    {
      question: "Do you cater for events?",
      answer: "Yes, we do.",
    },
  ];
  const mainQuestions = useMemo(() => {
    if (moreLoaded) return questions;
    return questions.slice(0, 4);
  }, [moreLoaded]);
  return (
    <div id="faq" className="flex gap-6 flex-col w-full bg-white mx-auto  rounded-[2rem] ">
      {mainQuestions.map((question, index) => (
        <SingleQuestion
          index={index}
          activeQuestion={activeQuestion}
          setActiveQuestion={setActiveQuestion}
          key={`question_${index}`}
          question={question}
        />
      ))}
      {!moreLoaded && (
        <div className="flex justify-center">
          <Button
            title={"Load more"}
            onClick={() => setMoreLoaded(true)}
            variant="primary"
            className="py-6 font-bold font-inter h-[2.5rem]"
          />
        </div>
      )}
    </div>
  );
}
