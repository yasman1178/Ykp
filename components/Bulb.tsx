import Image from "next/image";

const Bulb = () => {
    return (
        <div className="absolute -left-24 -bottom-12 rotate-6 mix-blend-color-dodge animate-pulse z-5 w-[200px] xl:w-[260px]">
            <Image
                src={'/bulb.png'}
                width={260}
                height={200}
                className="w-full h-full"
                alt=""
            />
        </div>
    );
};

export default Bulb;
