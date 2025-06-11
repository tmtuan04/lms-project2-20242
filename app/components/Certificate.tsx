"use client";

import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image as PDFImage,
} from "@react-pdf/renderer";
import { useState, useEffect } from "react";
import { CourseData } from "@/app/lib/definitions";

const styles = StyleSheet.create({
  page: {
    padding: 60,
    backgroundColor: "#ffffff",
    borderColor: "#cbd5e0",
    borderWidth: 2,
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1a202c",
    marginBottom: 8,
    textAlign: "center",
    textTransform: "uppercase",
  },
  subtitle: {
    fontSize: 14,
    color: "#4a5568",
    marginBottom: 10,
    textAlign: "center",
  },
  content: {
    alignItems: "center",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2d3748",
    marginBottom: 10,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    color: "#4a5568",
    marginBottom: 6,
    textAlign: "center",
  },
  courseName: {
    fontSize: 18,
    color: "#2c5282",
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  date: {
    fontSize: 12,
    color: "#718096",
    textAlign: "center",
    marginTop: 30,
  },
  footer: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
  signatureContainer: {
    alignItems: "center",
    width: "40%",
  },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#4a5568",
    width: "100%",
    marginBottom: 6,
  },
  signatureText: {
    fontSize: 12,
    marginTop: 8,
    color: "#4a5568",
    textAlign: "center",
  },
});

interface CertificateProps {
  courseData: CourseData;
  userName: string;
  completionDate: string;
}

const PDFCertificate = ({
  courseData,
  userName,
  completionDate,
}: CertificateProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <PDFImage src="/LogoHust.png" style={styles.logo} />
        <Text style={styles.title}>Certificate of Completion</Text>
        <Text style={styles.subtitle}>This certifies that</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.name}>{userName}</Text>
        <Text style={styles.text}>has successfully completed the course</Text>
        <Text style={styles.courseName}>{courseData.title}</Text>
        <Text style={styles.text}>with a 100% completion rate</Text>
      </View>

      <Text style={styles.date}>
        Issued on{" "}
        {new Date(completionDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </Text>

      <View style={styles.footer}>
        <View style={styles.signatureContainer}>
          <View style={styles.signatureLine} />
          <Text style={styles.signatureText}>Course Instructor</Text>
          <Text style={styles.signatureText}>{courseData.instructor.name}</Text>
        </View>

        <View style={styles.signatureContainer}>
          <View style={styles.signatureLine} />
          <Text style={styles.signatureText}>Platform Director</Text>
          <Text style={styles.signatureText}>HustLMS - Learning System</Text>
        </View>
      </View>
    </Page>
  </Document>
);

const Certificate = ({
  courseData,
  userName,
  completionDate,
}: CertificateProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500); // Simulate loading
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen">
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin" />
            <p className="text-blue-600 font-semibold text-lg">Generating certificate...</p>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0">
          <PDFViewer style={{ width: "100%", height: "100%" }}>
            <PDFCertificate
              courseData={courseData}
              userName={userName}
              completionDate={completionDate}
            />
          </PDFViewer>
        </div>
      )}
    </div>
  );
};

export default Certificate;