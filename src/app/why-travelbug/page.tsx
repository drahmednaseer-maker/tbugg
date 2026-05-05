import { Metadata } from "next";
import WhyChooseUs from "@/components/sections/WhyChooseUs";

export const metadata: Metadata = {
  title: "Why TravelBug.pk — Our Philosophy | Photographer-Led Tours",
  description: "Learn what makes TravelBug.pk different. Photographer-led, small group, and 100% custom-tailored journeys across Pakistan.",
};

export default function WhyTravelBugPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#060B18" }}>
      <div style={{ paddingTop: "120px" }}>
        <WhyChooseUs />
      </div>
      
      {/* Additional Deep Dive Section */}
      <section style={{ padding: "80px 0 120px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "60px" }}>
            <div>
              <h3 style={{ color: "white", fontSize: "24px", fontWeight: 800, marginBottom: "20px" }}>The Photographer's Eye</h3>
              <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>
                We believe that travel is about seeing, not just visiting. Our guides are trained to help you find the best light, the most dramatic angles, and the hidden details that most travelers walk past. Whether you carry a professional DSLR or a smartphone, you'll leave with a portfolio of memories.
              </p>
            </div>
            <div>
              <h3 style={{ color: "white", fontSize: "24px", fontWeight: 800, marginBottom: "20px" }}>Beyond the KKH</h3>
              <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>
                The Karakoram Highway is just the beginning. We specialize in the detours — the valleys like Shimshal, Hushe, and the remote corners of Chitral where time has stood still. Our deep relationships with local communities ensure you're welcomed as a guest, not just a tourist.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
