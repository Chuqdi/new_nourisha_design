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
      question: "Question",
      answer:
        "To get started, simply create a personal or business account to start verifying invoices and payment requests.",
    },
    {
      question: "Question",
      answer:
        "To get started, simply create a personal or business account to start verifying invoices and payment requests.",
    },
    {
      question: "Question",
      answer:
        "To get started, simply create a personal or business account to start verifying invoices and payment requests.",
    },
    {
      question: "Question",
      answer:
        "To get started, simply create a personal or business account to start verifying invoices and payment requests.",
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
