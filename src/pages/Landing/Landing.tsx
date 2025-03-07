import React from "react";
import { useTranslation } from "react-i18next";

const LandingContent: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className=" bg-white text-[#000000] min-h-screen w-full">
      {/* Section 1: Hero Section */}
      <section className="flex flex-col lg:flex-row items-end lg:justify-between gap-10 w-full">
        <h2 className="text-7xl">
          {t("Make an appointment")} <span className="text-primary font-semibold">{t("easy")}</span> {t("and")} <span className="text-primary font-semibold">{t("fast")}</span>
        </h2>
        <p className="text-[#555] text-xl ">
          {t("Checking your family health by professional team doctors with complete and modern facilities services.")}
        </p>
      </section>

      {/* Section 2: Advantages and Image */}
      <section className="mt-12 flex flex-col lg:flex-row items-start lg:justify-between gap-8">
        <div className="min-w-[300px] flex flex-col justify-center space-y-4">
          <h3 className="text-primary font-semibold text-xl">{t("Our Advantages")}</h3>
          <div className="mt-4 space-y-4">
            <div className="flex items-center space-x-3 text-[#555] text-lg">
              <img src="/landing/appointment.svg" alt="appointment" className="w-6 h-6" />
              <p>{t("Make an appointment")}</p>
            </div>
            <div className="flex items-center space-x-3 text-[#555] text-lg">
              <img src="/landing/tele.svg" alt="telemedicine" className="w-6 h-6" />
              <p>{t("Telemedicine")}</p>
            </div>
            <div className="flex items-center space-x-3 text-[#555] text-lg">
              <img src="/landing/chatbot.svg" alt="AI Assistant" className="w-6 h-6" />
              <p>{t("AI Health Assistant")}</p>
            </div>
            <div className="flex items-center space-x-3 text-[#555] text-lg">
              <img src="/landing/dashboard.svg" alt="dashboard" className="w-6 h-6" />
              <p>{t("Smart Clinical Dashboard")}</p>
            </div>
          </div>
        </div>
        <div className=" relative flex items-end">
          <img src="/landing/intro.svg" alt="Doctors Team" className="rounded-lg shadow-lg max-w-full" />
          <div className="absolute bottom-[-20px] right-[-20px] bg-white w-48 h-35 p-4 rounded-lg shadow-[-10px_10px_20px_rgba(0,0,0,0.2)] transform transition-all hover:scale-105 hover:shadow-[-15px_15px_25px_rgba(0,0,0,0.3)] flex">
            <div className="w-1/4 flex justify-center items-start">
              <img src="/landing/consultant.svg" alt="consultant" className="w-8 h-8" />
            </div>
            <div className="w-3/4 flex flex-col justify-start pr-2">
              <p className="text-primary font-bold text-lg">{t("Consultant")}</p>
              <p className="text-sm text-[#555] mt-1">{t("Quick Diagnosis, Instant Booking!")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Quality Service */}
      <section className="text-center py-12 px-35 text-[#000000] max-w-2xl mx-auto">
        <h2 className="text-5xl font-Medium py-5">
          {t("The")} <span className="text-primary">{t("Best Quality")}</span> {t("Service For Your Family")}
        </h2>
        <p className="text-[#555] mt-3 text-xl">
          {t("Our best team doctor with complete and modern facilities will keep you healthy or return you to health from sick.")}
        </p>
      </section>
    </div>
  );
};

export default LandingContent;
