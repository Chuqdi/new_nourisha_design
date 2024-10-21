import { Icon } from "@iconify/react/dist/iconify.js";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import Button from "../ui/Button";
//@ts-ignore
import HTMLRenderer from "react-html-renderer";

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
              <HTMLRenderer html={question.answer} />
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
      question: "Do you deliver across all UK cities?",
      answer:
        "Yes, we deliver anywhere in the UK, including Northern Ireland. Please note deliveries to Northern Ireland may attract additional fees.",
    },
    {
      answer: `Yes, you can select your choice of meals from the available menu.`,
      question:
        "Do I get to select my preferred meals for the weekly subscription plan or there's already a selected meal that comes with the package?",
    },
    {
      question:
        "How does the weekly subscription plan work. Do you deliver each meal daily?",
      answer:
        "No, we don't deliver daily, your meals are prepped and delivered once on your preferred delivery day.",
    },
    {
      question:
        "How long should my meals last in my fridge after receiving it? ",
      answer: "Ideally 7 days. To last longer, keep them frozen.",
    },
    {
      question:
        "Can I select African and Asian/European dishes when planning my meal plan?",
      answer: `No. You can either select from the African or Asian/European menu when planning your meal but not both.`,
    },
    {
      question:
        "What happens if I have auto renewal turned on or if I subscribed to a monthly plan?",
      answer:
        "If you have turned on auto renewal, you will be debited weekly and you will get an in-app notifications to plan your meal for the week and select your preffered delivery date. You can always select your meals from what is available on our menu and you are not restricted to the meals you had the previous week.",
    },
    {
      question: "What if I subscribed to a monthly plan?",
      answer:
        "If you have subscribed to a monthly plan, you will get an in-app notification reminder every weekend to plan your meal for the week ahead and chose a preferred delivery date. You can always select your meals from what is available on our menu and you are not restricted to the meals you had the previous week.",
    },
    {
      question: "What days can I receive my order and are weekends inclusive? ",
      answer:
        "Deliveries are scheduled from Tuesdays - Fridays.Weekend delivery attracts an extra fee of £8.",
    },

    {
      question: `I can't find what I'm looking for.`,
      answer:
        "If you still need help, please contact our customer care team for help.",
    },

    {
      question: "Do you cater for events?",
      answer: `Yes, we do. <a style="color:#FE7E00;fontSize:1rem;" href="/party_plan">Visit our party plans page</a>.`,
    },
  ];
  const mainQuestions = useMemo(() => {
    if (moreLoaded) return questions;
    return questions.slice(0, 4);
  }, [moreLoaded]);
  return (
    <div className="flex gap-6 flex-col w-full bg-white mx-auto  rounded-[2rem] ">
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
