import { motion } from "framer-motion";
import { personalInfo } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GraduationCap } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function About() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={{
            initial: { opacity: 0 },
            animate: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl font-bold text-center mb-8"
          >
            About Me
          </motion.h2>

          <motion.p 
            variants={fadeInUp}
            className="text-lg text-muted-foreground text-center mb-12"
          >
            {personalInfo.summary}
          </motion.p>

          <motion.div variants={fadeInUp}>
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <GraduationCap className="h-6 w-6" />
              Education
            </h3>
            <div className="space-y-6">
              {personalInfo.education.map((edu, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <h4 className="text-xl font-semibold mb-2">
                        {edu.degree}
                      </h4>
                      <p className="text-muted-foreground mb-2">
                        {edu.school}
                      </p>
                      <p className="text-sm text-muted-foreground mb-2">
                        {edu.year}
                      </p>
                      <Separator className="my-3" />
                      <p className="text-sm">
                        {edu.details}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
