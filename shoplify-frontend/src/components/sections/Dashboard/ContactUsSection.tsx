import { useEffect, type SetStateAction } from "react";
import { useInView } from "react-intersection-observer";

type props = {
  onVisible: React.Dispatch<SetStateAction<string>>;
};

export default function ContactUsSection({ onVisible }: props) {
  const { ref, inView } = useInView({ threshold: 0.8 });

  useEffect(() => {
    if (inView) {
      onVisible("contactus");
    }
  }, [inView, onVisible]);

  return (
    <section id="contactus" ref={ref}>
      <div className="bg-black text-white pt-20">
        <div className="flex flex-row justify-center gap-x-10 py-10">
          <div className="max-w-2xs">
            <p>ICON</p>
          </div>
          <div className="max-w-2xs">
            <p>
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
              faucibus ex sapien vitae pellentesque sem placerat. In id cursus
              mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
              urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum
              egestas. Iaculis massa nisl malesuada lacinia integer nunc
              posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad
              litora torquent per conubia nostra inceptos himenaeos.
            </p>
          </div>
          <div className="max-w-2xs">
            <p>ICON</p>
          </div>
        </div>
        <div className="flex flex-row py-5 mx-100 border-t-2">
          <p>@ 2026 Shoplify, All Copyrights reserved</p>
        </div>
      </div>
    </section>
  );
}
