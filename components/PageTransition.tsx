import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

const PageTransition = ({ children }: {children: ReactNode}) => {

    const router = useRouter()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      key={router.pathname}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
