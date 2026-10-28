import React from 'react';

export const TeaserPersonalMoment: React.FC = () => {
  return (
    <section className="py-28 sm:py-40 px-6 sm:px-10 lg:px-16 max-w-3xl mx-auto text-center space-y-8">
      {/* Subtle, restrained label */}
      <span className="font-handwriting text-base sm:text-lg text-ankahe-gold tracking-wide block">
        A quiet pause
      </span>

      {/* Intimate Central Thought */}
      <div className="space-y-4">
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ankahe-text font-normal leading-tight">
          Tumhari bhi koi kahani hogi na?
        </h2>

        <p className="font-serif italic text-xl sm:text-2xl text-ankahe-gold font-light">
          Some stories are told. Others are written.
        </p>
      </div>

      {/* Understated Supporting Reflection with generous whitespace */}
      <div className="max-w-xl mx-auto pt-2 space-y-2 text-sm sm:text-base text-ankahe-muted font-light leading-relaxed">
        <p>
          The draft you deleted three times. The goodbye that happened too quietly. The ordinary day you didn't know would be the last of its kind.
        </p>
        <p className="text-xs sm:text-sm text-ankahe-muted/70 italic pt-2">
          You don't have to explain it to anyone. It simply matters that it exists.
        </p>
      </div>
    </section>
  );
};
