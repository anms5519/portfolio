import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Award, Calendar, ExternalLink } from "lucide-react";
import { personalInfo } from "@/lib/constants";
import { Button } from "@/components/ui/button";

// Mapping of certificate names to their image URLs
const certificateImages: Record<string, string> = {
  "HHP (Mobile) Service For Hardware and Software": "https://placehold.co/800x600/png", // Replace with actual image URLs
  "Mobile Game Development (Cross Platform)": "https://placehold.co/800x600/png",
  "Beginner's Guide to Python 3 Programming": "https://placehold.co/800x600/png",
  // Add more mappings for other certificates
};

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState<(typeof personalInfo.certifications)[0] | null>(null);

  return (
    <section id="certificates" className="py-20">
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
            variants={{
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 }
            }}
            className="text-3xl font-bold text-center mb-12"
          >
            Certifications & Achievements
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {personalInfo.certifications.map((cert, index) => (
              <motion.div
                key={index}
                variants={{
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 }
                }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 10,
                  transition: { duration: 0.3 }
                }}
                onClick={() => setSelectedCert(cert)}
              >
                <Card className="cursor-pointer hover:border-primary/50 transition-colors transform-gpu perspective-1000">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <Award className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">{cert.name}</h3>
                        <p className="text-sm text-muted-foreground">{cert.provider}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{cert.date}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <Dialog open={!!selectedCert} onOpenChange={() => setSelectedCert(null)}>
            <DialogContent className="max-w-5xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                  <Award className="h-6 w-6 text-primary" />
                  {selectedCert?.name}
                </DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Certificate Image */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 border-[20px] border-muted rounded-lg pointer-events-none" />
                    <img
                      src={selectedCert ? certificateImages[selectedCert.name] : ''}
                      alt={selectedCert?.name}
                      className="w-full h-auto rounded-lg shadow-lg"
                    />
                  </motion.div>

                  {/* Certificate Details */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="bg-card p-6 rounded-lg shadow-lg">
                      <h3 className="text-2xl font-semibold mb-4">Certificate Details</h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-muted-foreground mb-2">Issued By</p>
                          <p className="font-medium">{selectedCert?.provider}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-2">Issue Date</p>
                          <p className="font-medium">{selectedCert?.date}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-2">Recipient</p>
                          <p className="font-medium">Kholipha Ahmmad Al-Amin</p>
                        </div>
                      </div>

                      <div className="mt-6">
                        <Button className="w-full" variant="outline">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Original Certificate
                        </Button>
                      </div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="flex flex-wrap gap-2"
                    >
                      <Badge variant="secondary" className="px-3 py-1">
                        Verified
                      </Badge>
                      <Badge variant="outline" className="px-3 py-1">
                        {selectedCert?.provider}
                      </Badge>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>
    </section>
  );
}