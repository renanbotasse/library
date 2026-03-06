"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const QUOTES = [
  { text: "A room without books is like a body without a soul.", author: "Marcus Tullius Cicero" },
  { text: "I have always imagined that Paradise will be a kind of library.", author: "Jorge Luis Borges" },
  { text: "When in doubt go to the library.", author: "J.K. Rowling" },
  { text: "A library is not a luxury but one of the necessities of life.", author: "Henry Ward Beecher" },
  { text: "The only thing that you absolutely have to know is the location of the library.", author: "Albert Einstein" },
  { text: "Libraries store the energy that fuels the imagination.", author: "Sidney Sheldon" },
  { text: "A library is the delivery room for the birth of ideas.", author: "Norman Cousins" },
  { text: "Without libraries what have we? We have no past and no future.", author: "Ray Bradbury" },
  { text: "The library is inhabited by spirits that come out of the pages at night.", author: "Isabel Allende" },
  { text: "A great library contains the diary of the human race.", author: "George Mercer Dawson" },
  { text: "Books are the quietest and most constant of friends.", author: "Charles William Eliot" },
  { text: "Books are mirrors: you only see in them what you already have inside you.", author: "Carlos Ruiz Zafón" },
  { text: "A reader lives a thousand lives before he dies.", author: "George R. R. Martin" },
  { text: "Books are uniquely portable magic.", author: "Stephen King" },
  { text: "There is no friend as loyal as a book.", author: "Ernest Hemingway" },
  { text: "Reading is a discount ticket to everywhere.", author: "Mary Schmich" },
  { text: "Books break the shackles of time.", author: "Franz Kafka" },
  { text: "A book must be the axe for the frozen sea within us.", author: "Franz Kafka" },
  { text: "Good friends, good books, and a sleepy conscience: this is the ideal life.", author: "Mark Twain" },
  { text: "The man who does not read has no advantage over the man who cannot read.", author: "Mark Twain" },
  { text: "Reading is essential for those who seek to rise above the ordinary.", author: "Jim Rohn" },
  { text: "Classic: a book which people praise and don't read.", author: "Mark Twain" },
  { text: "A good book is an event in my life.", author: "Stendhal" },
  { text: "Books and doors are the same thing. You open them, and you go through into another world.", author: "Jeanette Winterson" },
  { text: "Reading brings us unknown friends.", author: "Honoré de Balzac" },
  { text: "Books are the treasured wealth of the world.", author: "Henry David Thoreau" },
  { text: "A book is a dream that you hold in your hand.", author: "Neil Gaiman" },
  { text: "Books serve to show a man that those original thoughts of his aren't very new after all.", author: "Abraham Lincoln" },
  { text: "Reading furnishes the mind only with materials of knowledge.", author: "John Locke" },
  { text: "If you only read the books that everyone else is reading, you can only think what everyone else is thinking.", author: "Haruki Murakami" },
  { text: "Reading is to the mind what exercise is to the body.", author: "Joseph Addison" },
  { text: "Books are the training weights of the mind.", author: "Epictetus" },
  { text: "A book is like a garden carried in the pocket.", author: "Chinese proverb" },
  { text: "Books are the plane, and the train, and the road.", author: "Anna Quindlen" },
  { text: "Books are lighthouses erected in the great sea of time.", author: "E.P. Whipple" },
  { text: "So many books, so little time.", author: "Frank Zappa" },
  { text: "Reading gives us someplace to go when we have to stay where we are.", author: "Mason Cooley" },
  { text: "Think before you speak. Read before you think.", author: "Fran Lebowitz" },
  { text: "Books may well be the only true magic.", author: "Alice Hoffman" },
  { text: "Reading is a conversation. All books talk.", author: "Mark Haddon" },
  { text: "Books are the mirrors of the soul.", author: "Virginia Woolf" },
  { text: "Literature is the most agreeable way of ignoring life.", author: "Fernando Pessoa" },
  { text: "Reading is dreaming with open eyes.", author: "Unknown" },
  { text: "Books are the best companions.", author: "Robert Louis Stevenson" },
  { text: "A book is a gift you can open again and again.", author: "Garrison Keillor" },
  { text: "We read to know we are not alone.", author: "William Nicholson" },
  { text: "Books are humanity in print.", author: "Barbara Tuchman" },
  { text: "Libraries are reservoirs of strength.", author: "Germaine Greer" },
  { text: "Books are the carriers of civilization.", author: "Richard de Bury" },
  { text: "The reading of all good books is like conversation with the finest minds.", author: "René Descartes" },
  { text: "Books give a soul to the universe.", author: "Plato" },
  { text: "A library is a hospital for the mind.", author: "Anonymous proverb" },
  { text: "Books are the bees which carry the quickening pollen from one mind to another.", author: "James Russell Lowell" },
  { text: "A book is the only place in which you can examine a fragile thought without breaking it.", author: "Edward Morgan Forster" },
  { text: "There is no frigate like a book.", author: "Emily Dickinson" },
  { text: "If you don't like to read, you haven't found the right book.", author: "J.K. Rowling" },
  { text: "Books are the ultimate Dumpees: put them down and they'll wait for you forever.", author: "John Green" },
  { text: "Once you learn to read, you will be forever free.", author: "Frederick Douglass" },
  { text: "Reading is the gateway skill.", author: "Barack Obama" },
  { text: "The love of books is the best of all.", author: "Arthur Conan Doyle" },
  { text: "Books are the food of the mind.", author: "Richard Steele" },
  { text: "Reading is an act of civilization.", author: "Walter Benjamin" },
  { text: "Books make the world smaller.", author: "David Mitchell" },
  { text: "Books allow you to travel without moving your feet.", author: "Jhumpa Lahiri" },
  { text: "Reading is the art of listening.", author: "Mortimer Adler" },
  { text: "A book is a mirror of society.", author: "Victor Hugo" },
  { text: "Reading renews the spirit.", author: "Johann Wolfgang von Goethe" },
  { text: "Books are companions for life.", author: "Rudyard Kipling" },
  { text: "The true university of these days is a collection of books.", author: "Thomas Carlyle" },
  { text: "Reading is the best learning.", author: "Alexander Pushkin" },
  { text: "Books are humanity's memory.", author: "Umberto Eco" },
  { text: "A library is a sanctuary of knowledge.", author: "Neil Gaiman" },
  { text: "Books shape the soul.", author: "Ralph Waldo Emerson" },
  { text: "Reading is an adventure.", author: "Madeleine L'Engle" },
  { text: "Books are the best weapons in the world.", author: "Doctor Who" },
  { text: "Libraries are the memory of humankind.", author: "Jacques Attali" },
  { text: "A house full of books is a house full of dreams.", author: "Unknown" },
  { text: "Books are bridges between cultures.", author: "Kofi Annan" },
  { text: "Reading makes immigrants of us all.", author: "Jean Rhys" },
  { text: "Books make great companions.", author: "Lemony Snicket" },
  { text: "Reading is the architecture of knowledge.", author: "Harold Bloom" },
  { text: "A library is the temple of learning.", author: "Plutarch" },
  { text: "Books are the legacy of genius.", author: "Thomas Paine" },
  { text: "Reading is thinking with someone else's mind.", author: "Arthur Schopenhauer" },
  { text: "Books carry civilization across centuries.", author: "Carl Sagan" },
  { text: "Libraries are gateways to knowledge.", author: "Carla Hayden" },
  { text: "Reading makes a full man.", author: "Francis Bacon" },
  { text: "Books are tools of freedom.", author: "Aung San Suu Kyi" },
  { text: "A library is a house of hope.", author: "Augustine Birrell" },
  { text: "Books are the scaffolding of civilization.", author: "Will Durant" },
  { text: "Libraries connect us to the wisdom of the past.", author: "Vartan Gregorian" },
  { text: "Reading is a refuge.", author: "W. Somerset Maugham" },
  { text: "Books are a uniquely human magic.", author: "Stephen King" },
  { text: "Libraries are where the future begins.", author: "R. David Lankes" },
  { text: "Reading is the conversation of the ages.", author: "Plato" },
  { text: "Books open the doors of imagination.", author: "Margaret Atwood" },
  { text: "Libraries are the archives of civilization.", author: "Umberto Eco" },
  { text: "A book is a machine to think with.", author: "I. A. Richards" },
  { text: "The library is the beating heart of culture.", author: "Neil Gaiman" },
];

export function QuoteRotator() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % QUOTES.length), 10000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative flex min-h-[8rem] flex-col items-center justify-center text-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <p className="font-serif text-2xl italic leading-relaxed tracking-wide text-muted sm:text-[1.7rem]">
            &ldquo;{QUOTES[idx]!.text}&rdquo;
          </p>
          <span className="mt-2 block font-sans text-base tracking-widest text-gold/50 uppercase">
            — {QUOTES[idx]!.author}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
