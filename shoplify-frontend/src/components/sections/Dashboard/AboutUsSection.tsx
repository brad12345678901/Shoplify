import { useEffect, useState, type SetStateAction } from "react";
import { useInView } from "react-intersection-observer";

type props = {
  onVisible: React.Dispatch<SetStateAction<string>>;
};

export default function AboutUsSection({ onVisible }: props) {
  const { ref, inView } = useInView({ threshold: 0.8 });
  const [visited, setVisited] = useState<boolean>(false);

  useEffect(() => {
    if (inView) {
      if (!visited) setVisited(true);
      onVisible("aboutus");
    }
  }, [inView, onVisible]);

  return (
    <section id="aboutus" ref={ref}>
      <div className="pt-100 pb-40 px-20 h-300 place-items-end">
        <div className="text-black text-right max-w-250">
          <p
            className={`font-medium text-7xl transition ease-in-out duration-700 ${visited ? `opacity-100 translate-x-0` : `opacity-0 -translate-x-10`}`}
          >
            We are Shoplify! Giving out convenient products to our customers!
          </p>
          <p
            className={`mt-8 font-light text-xl transition ease-in delay-150 duration-700 ${visited ? `opacity-100` : `opacity-0`}`}
          >
            With us, you will surely find what you're looking for!
          </p>
        </div>
      </div>
    </section>
  );
}
