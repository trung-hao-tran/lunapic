'use client';

import { motion } from "framer-motion";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import useMeasure from "react-use-measure";

const CARD_WIDTH = 450;
const CARD_HEIGHT = 650;
const MARGIN = 30;
const CARD_SIZE = CARD_WIDTH + MARGIN;

const BREAKPOINTS = {
  sm: 640,
  lg: 1024,
};

export interface CardItem {
  id: number;
  url: string;
  category: string;
  title: string;
  description: string;
}

interface CardCarouselProps {
  items: CardItem[];
  title?: string;
  subtitle?: string;
}

const CardCarousel: React.FC<CardCarouselProps> = ({ 
  items, 
  title = "Our Filmography", 
  subtitle = "Projects we're proud of" 
}) => {
  const [ref, { width }] = useMeasure();
  const [offset, setOffset] = useState(0);

  const CARD_BUFFER = 3;

  const CAN_SHIFT_LEFT = offset < 0;
  const CAN_SHIFT_RIGHT =
    Math.abs(offset) < CARD_SIZE * (items.length - CARD_BUFFER);

  const shiftLeft = () => {
    if (!CAN_SHIFT_LEFT) return;
    setOffset((pv) => (pv += CARD_SIZE));
  };

  const shiftRight = () => {
    if (!CAN_SHIFT_RIGHT) return;
    setOffset((pv) => (pv -= CARD_SIZE));
  };

  return (
    <section className="bg-[#020202] py-16" ref={ref}>
      <div className="mx-auto w-[90vw] md:w-[65vw]">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[#F9F9F9] sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-[#BDBDBD]">{subtitle}</p>
        </div>
        
        <div className="relative overflow-hidden">
          <motion.div
            animate={{ x: offset }}
            className="flex"
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            {items.map((item) => (
              <Card key={item.id} {...item} />
            ))}
          </motion.div>

          <motion.button
            initial={false}
            animate={{
              x: CAN_SHIFT_LEFT ? "0%" : "-100%",
              opacity: CAN_SHIFT_LEFT ? 1 : 0,
            }}
            className="absolute left-0 top-[50%] z-30 -translate-y-1/2 rounded-r-xl bg-[#F9F9F9]/20 p-3 pl-2 text-3xl text-[#F9F9F9] backdrop-blur-sm transition-all hover:bg-[#F9F9F9]/30 hover:pl-3"
            onClick={shiftLeft}
          >
            <FiChevronLeft />
          </motion.button>
          
          <motion.button
            initial={false}
            animate={{
              x: CAN_SHIFT_RIGHT ? "0%" : "100%",
              opacity: CAN_SHIFT_RIGHT ? 1 : 0,
            }}
            className="absolute right-0 top-[50%] z-30 -translate-y-1/2 rounded-l-xl bg-[#F9F9F9]/20 p-3 pr-2 text-3xl text-[#F9F9F9] backdrop-blur-sm transition-all hover:bg-[#F9F9F9]/30 hover:pr-3"
            onClick={shiftRight}
          >
            <FiChevronRight />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

const Card: React.FC<CardItem> = ({ url, category, title, description }) => {
  return (
    <div
      className="relative shrink-0 cursor-pointer rounded-2xl shadow-md transition-all hover:scale-[1.015] hover:shadow-xl"
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        marginRight: MARGIN,
        backgroundImage: `url(${url})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 z-20 rounded-2xl bg-gradient-to-b from-black/90 via-black/60 to-black/0 p-8 text-[#F9F9F9] transition-all hover:backdrop-blur-sm">
        <span className="text-xs font-semibold uppercase text-[#BDBDBD]">
          {category}
        </span>
        <p className="my-4 text-3xl font-bold leading-tight">{title}</p>
        <p className="text-lg text-[#BDBDBD] leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default CardCarousel;