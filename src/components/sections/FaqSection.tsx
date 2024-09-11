import { Icon } from "@iconify/react/dist/iconify.js";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

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
  const questions = [
    {
      question: "How long does delivery take?",
      answer:
        "Delivery takes between 24 hours to 48 hours depending on location.Your order needs to be placed before 12:00 pm of the previous day to be received within 24 hours.",
    },
    {
      question: "Can I choose to subscribe for the weekly or monthly plan this week and decide not to pay for a subscription plan the following week?",
      answer:
        "Most certainly. The subscription plan is not a compulsory Auto-renewal. However, if you choose to be on Auto-renewal, just click on the auto-renewal button displayed on the app.",
    },
    {
      question: "Do you deliver across all UK cities?",
      answer:
        "Yes, we deliver anywhere within the UK.",
    },
    {
      question: "How does the weekly subscription plan work. Do you deliver each meal daily?",
      answer:
        "No, we do not.\n All 14 meals are delivered at once ",
    },
    {
      question: "How long should my weekly plan last in my fridge after receiving? ",
      answer:
        "WIthin 7-10 days.",
    },
  ];
  return (
    <div className="flex gap-6 flex-col w-full bg-white mx-auto  rounded-[2rem] ">
      {questions.map((question, index) => (
        <SingleQuestion
          index={index}
          activeQuestion={activeQuestion}
          setActiveQuestion={setActiveQuestion}
          key={`question_${index}`}
          question={question}
        />
      ))}
    </div>
  );
}
