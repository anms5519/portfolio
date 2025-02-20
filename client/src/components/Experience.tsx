import { motion } from "framer-motion";
import { personalInfo } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, ChevronRight } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 }
};

export default function Experience() {
  return (
    <section id="experience" className="py-20">
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
            className="text-3xl font-bold text-center mb-12"
          >
            Professional Experience
          </motion.h2>

          <div className="space-y-8">
            {personalInfo.experience.map((exp, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Briefcase className="h-5 w-5 text-primary" />
                        <div>
                          <h3 className="text-xl font-semibold">
                            {exp.title}
                          </h3>
                          <p className="text-muted-foreground">
                            {exp.company}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">
                          {exp.period}
                        </p>
                        <Badge variant="outline" className="mt-1">
                          {exp.type}
                        </Badge>
                      </div>
                    </div>

                    <ul className="space-y-2">
                      {exp.details.map((detail, detailIndex) => (
                        <motion.li
                          key={detailIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: detailIndex * 0.2 }}
                          className="flex items-start gap-2"
                        >
                          <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
