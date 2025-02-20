import { motion } from "framer-motion";
import { personalInfo } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Wrench, 
  Code2, 
  Monitor, 
  Brain 
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 }
};

const skillCategories = [
  { 
    title: "Tools & Technologies",
    icon: <Wrench className="h-5 w-5" />,
    skills: personalInfo.skills.tools
  },
  {
    title: "Programming Languages",
    icon: <Code2 className="h-5 w-5" />,
    skills: personalInfo.skills.languages
  },
  {
    title: "Operating Systems",
    icon: <Monitor className="h-5 w-5" />,
    skills: personalInfo.skills.os
  },
  {
    title: "Other Skills",
    icon: <Brain className="h-5 w-5" />,
    skills: personalInfo.skills.other
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-muted/50">
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
            Skills & Expertise
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillCategories.map((category, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      {category.icon}
                      <h3 className="text-xl font-semibold">
                        {category.title}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skillIndex}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: skillIndex * 0.1 }}
                        >
                          <Badge
                            variant="secondary"
                            className="text-sm py-1 px-3"
                          >
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
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