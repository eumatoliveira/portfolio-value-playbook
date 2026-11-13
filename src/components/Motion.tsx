import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

export function Reveal({ delay = 0, ...props }: HTMLMotionProps<"div"> & { delay?: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : delay, ease: [0.2, 0.7, 0.2, 1] }}
      {...props}
    />
  );
}

export function Stagger({ children, ...props }: HTMLMotionProps<"div">) {
  const reduced = useReducedMotion();
  return <motion.div {...props} initial={reduced ? false : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.08 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: reduced ? 0 : 0.075 } } }}>{children}</motion.div>;
}

export function StaggerItem(props: HTMLMotionProps<"div">) {
  const reduced = useReducedMotion();
  return <motion.div {...props} variants={{ hidden: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 16 }, visible: { opacity: 1, y: 0, transition: { duration: reduced ? 0 : 0.45, ease: [0.2, 0.7, 0.2, 1] } } }} />;
}
