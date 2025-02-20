import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, Award } from "lucide-react";

interface CertificatePreviewProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: {
    name: string;
    provider: string;
    date: string;
  };
}

export default function CertificatePreview({
  isOpen,
  onClose,
  certificate,
}: CertificatePreviewProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Award className="h-6 w-6 text-primary" />
            {certificate.name}
          </DialogTitle>
          <DialogDescription>
            Issued by {certificate.provider}
          </DialogDescription>
        </DialogHeader>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="mt-4"
        >
          <div className="relative">
            {/* Frame effect */}
            <div className="absolute inset-0 border-[20px] border-muted rounded-lg pointer-events-none" />
            
            {/* Certificate content */}
            <div className="bg-card p-8 rounded-lg shadow-lg">
              <div className="text-center space-y-6">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-3xl font-serif mb-2">Certificate of Achievement</h3>
                  <p className="text-muted-foreground">This certifies that</p>
                  <p className="text-2xl font-semibold mt-4 mb-6">Kholipha Ahmmad Al-Amin</p>
                  <p className="text-muted-foreground">has successfully completed</p>
                  <p className="text-xl font-semibold mt-4">{certificate.name}</p>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex justify-center gap-4"
                >
                  <Badge variant="outline" className="px-4 py-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    {certificate.date}
                  </Badge>
                  <Badge variant="outline" className="px-4 py-2">
                    {certificate.provider}
                  </Badge>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
