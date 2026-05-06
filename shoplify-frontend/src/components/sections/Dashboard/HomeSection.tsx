import { useEffect, useState, type SetStateAction } from "react";
import { useInView } from "react-intersection-observer";

type props = {
  onVisible: React.Dispatch<SetStateAction<string>>;
};

export default function HomeSection({ onVisible }: props) {
  const { ref, inView } = useInView({ threshold: 0.8 });
  const [visited, setVisited] = useState<boolean>(false);

  useEffect(() => {
    console.log(inView)
    if (inView) {
      if (!visited) setVisited(true);
      onVisible("home");
    }
  }, [inView, onVisible]);

  return (
    <section id="home" ref={ref}>
      <div className="custom_section_1 pt-120 pb-40 px-20 h-320">
        <div className="text-white max-w-250">
          <p
            className={`font-medium text-7xl transition ease-in-out duration-700 ${visited ? `opacity-100 translate-x-0` : `opacity-0 -translate-x-10`}`}
          >
            Shop with us! Lift yourself with Products you deserve!
          </p>
          <p
            className={`mt-8 font-light text-xl transition ease-in delay-150 duration-700 ${visited ? `opacity-100` : `opacity-0`}`}
          >
            With just one click of a button, All you desired items will be on
            your possession!
          </p>
        </div>
      </div>
    </section>
  );
}
