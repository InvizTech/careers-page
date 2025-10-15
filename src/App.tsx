import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  Briefcase,
  MapPin,
  Clock,
  ChevronDown,
  Home,
} from "lucide-react";
import { Button } from "./components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Textarea } from "./components/ui/textarea";
import { Link } from "react-router-dom";

interface Job {
  title: string;
  level: string;
  description: string;
  location: string;
  type: string;
  department: string;
  fullDescription?: string;
  responsibilities?: string[];
  qualifications?: string[];
  benefits?: string[];
}
const COMPANY_EMAIL = "tushar@virtualtechx.com";
const API_URL = process.env.REACT_APP_API_URL || 'https://express-nodemailer-server.vercel.app';

export default function App() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [expandedDept, setExpandedDept] = useState<string | null>("Design");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [portfolioDialogOpen, setPortfolioDialogOpen] = useState(false);
  const [jobDetailsOpen, setJobDetailsOpen] = useState(false);

  const departments = ["All", "Design", "Development", "Marketing", "Strategy"];

  const jobs: Job[] = [
    {
      title: "UI/UX Designer",
      level: "Intern",
      description:
        "Create next-gen user experiences with Figma, motion UI, and AI-driven prototypes.",
      location: "Remote",
      type: "Internship",
      department: "Design",
      fullDescription:
        "Join our Design team as a UI/UX Designer Intern and help shape the future of digital experiences. You'll work alongside our creative team to design intuitive, beautiful interfaces that delight users and drive business results.",
      responsibilities: [
        "Design wireframes, mockups, and prototypes using Figma and other design tools",
        "Collaborate with developers to ensure pixel-perfect implementation",
        "Conduct user research and usability testing to inform design decisions",
        "Create and maintain design systems and component libraries",
        "Participate in design critiques and provide constructive feedback",
        "Stay updated with the latest design trends and best practices",
      ],
      qualifications: [
        "Currently pursuing or recently completed a degree in Design, HCI, or related field",
        "Strong portfolio demonstrating UI/UX design skills",
        "Proficiency in Figma, Adobe Creative Suite, or similar tools",
        "Understanding of user-centered design principles",
        "Good communication and collaboration skills",
        "Passion for creating exceptional user experiences",
      ],
      benefits: [
        "Mentorship from experienced designers",
        "Flexible remote work environment",
        "Access to design tools and resources",
        "Opportunity for full-time conversion",
        "Collaborative and creative work culture",
      ],
    },
    {
      title: "Brand & Visual Designer",
      level: "Mid-Level",
      description:
        "Develop visual identities, campaigns, and brand systems for global clients.",
      location: "On-site",
      type: "Full-time",
      department: "Design",
      fullDescription:
        "We're seeking a talented Brand & Visual Designer to craft compelling visual identities and brand experiences for our diverse client portfolio. This role combines strategic thinking with exceptional design execution.",
      responsibilities: [
        "Develop comprehensive brand identities from concept to delivery",
        "Create visual assets for marketing campaigns across multiple channels",
        "Design brand guidelines and ensure consistent application",
        "Collaborate with clients to understand their vision and goals",
        "Lead presentations and defend design decisions",
        "Manage multiple projects simultaneously while maintaining quality",
      ],
      qualifications: [
        "3-5 years of experience in brand design or visual identity",
        "Strong portfolio showcasing brand work and visual design",
        "Expert knowledge of Adobe Creative Suite",
        "Experience with motion graphics and video editing is a plus",
        "Excellent typography and layout skills",
        "Ability to work independently and as part of a team",
      ],
      benefits: [
        "Competitive salary and performance bonuses",
        "Health insurance and wellness programs",
        "Professional development opportunities",
        "Creative studio environment",
        "Work with high-profile clients",
      ],
    },
    {
      title: "Frontend Developer",
      level: "Intern",
      description:
        "Work with React/Next.js to build interactive web experiences.",
      location: "Remote",
      type: "Internship",
      department: "Development",
      fullDescription:
        "Join our Development team as a Frontend Developer Intern and build cutting-edge web applications using modern technologies. You'll gain hands-on experience with React, Next.js, and industry best practices.",
      responsibilities: [
        "Develop responsive web applications using React and Next.js",
        "Write clean, maintainable, and well-documented code",
        "Collaborate with designers to implement pixel-perfect UIs",
        "Optimize applications for maximum performance",
        "Participate in code reviews and team discussions",
        "Debug and troubleshoot issues across browsers and devices",
      ],
      qualifications: [
        "Pursuing a degree in Computer Science or related field",
        "Strong foundation in HTML, CSS, and JavaScript",
        "Familiarity with React or similar frontend frameworks",
        "Understanding of responsive design principles",
        "Git version control experience",
        "Eagerness to learn and grow as a developer",
      ],
      benefits: [
        "Remote work flexibility",
        "Mentorship from senior developers",
        "Exposure to modern tech stack",
        "Real-world project experience",
        "Potential for full-time employment",
      ],
    },
    {
      title: "AI Engineer",
      level: "Mid-Level",
      description:
        "Integrate AI and automation tools into digital products and experiences.",
      location: "Hybrid",
      type: "Full-time",
      department: "Development",
      fullDescription:
        "We're looking for an innovative AI Engineer to help us integrate artificial intelligence and machine learning into our products. You'll work on exciting projects that push the boundaries of what's possible with AI.",
      responsibilities: [
        "Design and implement AI-powered features and workflows",
        "Integrate machine learning models into production applications",
        "Optimize AI algorithms for performance and accuracy",
        "Collaborate with product teams to identify AI opportunities",
        "Stay current with latest AI/ML research and technologies",
        "Build and maintain AI infrastructure and pipelines",
      ],
      qualifications: [
        "3+ years of experience in AI/ML engineering",
        "Strong programming skills in Python and/or JavaScript",
        "Experience with ML frameworks (TensorFlow, PyTorch, etc.)",
        "Knowledge of NLP, computer vision, or generative AI",
        "Understanding of cloud platforms (AWS, GCP, or Azure)",
        "Strong problem-solving and analytical skills",
      ],
      benefits: [
        "Competitive compensation package",
        "Hybrid work model (2-3 days in office)",
        "Latest hardware and tools",
        "Conference and training budget",
        "Work on cutting-edge AI projects",
      ],
    },
    {
      title: "Social Media Strategist",
      level: "Intern",
      description:
        "Craft social campaigns that connect brands with their audiences.",
      location: "Remote",
      type: "Internship",
      department: "Marketing",
      fullDescription:
        "Join our Marketing team as a Social Media Strategist Intern and help create engaging content that resonates with audiences across platforms. You'll learn to develop data-driven social strategies for leading brands.",
      responsibilities: [
        "Develop and execute social media content calendars",
        "Create engaging posts, stories, and multimedia content",
        "Monitor social media trends and audience engagement",
        "Analyze campaign performance and provide insights",
        "Engage with community members and respond to comments",
        "Collaborate with design team on visual assets",
      ],
      qualifications: [
        "Currently pursuing degree in Marketing, Communications, or related field",
        "Strong understanding of major social media platforms",
        "Excellent writing and communication skills",
        "Creative mindset with attention to detail",
        "Basic knowledge of social media analytics",
        "Familiarity with content creation tools",
      ],
      benefits: [
        "Remote work flexibility",
        "Hands-on experience with real campaigns",
        "Mentorship from marketing professionals",
        "Portfolio-building opportunities",
        "Collaborative team environment",
      ],
    },
    {
      title: "Digital Marketing Executive",
      level: "Mid-Level",
      description:
        "Lead performance marketing and SEO campaigns for growth-driven results.",
      location: "On-site",
      type: "Full-time",
      department: "Marketing",
      fullDescription:
        "We're seeking an experienced Digital Marketing Executive to drive our performance marketing initiatives. You'll lead multi-channel campaigns that deliver measurable results and business growth.",
      responsibilities: [
        "Plan and execute digital marketing campaigns across channels",
        "Manage SEO/SEM strategies to improve organic and paid search performance",
        "Analyze campaign metrics and optimize for ROI",
        "Develop and manage marketing budgets",
        "Lead email marketing and automation workflows",
        "Collaborate with content and design teams on campaign assets",
      ],
      qualifications: [
        "3-5 years of digital marketing experience",
        "Proven track record in performance marketing and SEO",
        "Experience with Google Analytics, Google Ads, and marketing automation tools",
        "Strong analytical and data interpretation skills",
        "Excellent project management abilities",
        "Certifications in Google Ads or Analytics preferred",
      ],
      benefits: [
        "Competitive salary with performance incentives",
        "Health and wellness benefits",
        "Professional development budget",
        "Modern office environment",
        "Career advancement opportunities",
      ],
    },
    {
      title: "Project Coordinator",
      level: "Intern",
      description:
        "Collaborate with design and tech teams to manage agile workflows.",
      location: "Hybrid",
      type: "Internship",
      department: "Strategy",
      fullDescription:
        "Join our Strategy team as a Project Coordinator Intern and gain experience managing cross-functional projects. You'll learn agile methodologies while coordinating deliverables across design, development, and client teams.",
      responsibilities: [
        "Coordinate project timelines and deliverables",
        "Facilitate team meetings and agile ceremonies",
        "Track project progress and update stakeholders",
        "Maintain project documentation and resources",
        "Support team members with scheduling and coordination",
        "Help identify and resolve project blockers",
      ],
      qualifications: [
        "Pursuing degree in Business, Management, or related field",
        "Strong organizational and multitasking skills",
        "Excellent communication and interpersonal abilities",
        "Familiarity with project management tools (Asana, Jira, etc.)",
        "Detail-oriented with problem-solving mindset",
        "Interest in learning agile methodologies",
      ],
      benefits: [
        "Hybrid work arrangement",
        "Cross-functional team exposure",
        "Project management training",
        "Professional skill development",
        "Path to full-time role",
      ],
    },
    {
      title: "Business Development Executive",
      level: "Mid-Level",
      description: "Drive new client relationships and growth opportunities.",
      location: "On-site",
      type: "Full-time",
      department: "Strategy",
      fullDescription:
        "We're looking for a dynamic Business Development Executive to expand our client portfolio and drive revenue growth. You'll identify opportunities, build relationships, and close deals with leading organizations.",
      responsibilities: [
        "Identify and pursue new business opportunities",
        "Build and maintain relationships with prospective clients",
        "Develop proposals and presentations for pitches",
        "Negotiate contracts and close deals",
        "Collaborate with delivery teams to ensure client satisfaction",
        "Track pipeline and forecast revenue",
      ],
      qualifications: [
        "3-5 years of B2B sales or business development experience",
        "Proven track record of meeting or exceeding sales targets",
        "Strong presentation and negotiation skills",
        "Experience in tech, design, or digital services industry preferred",
        "CRM proficiency (Salesforce, HubSpot, etc.)",
        "Self-motivated with entrepreneurial mindset",
      ],
      benefits: [
        "Base salary plus commission structure",
        "Health insurance and benefits package",
        "Professional networking opportunities",
        "Leadership development programs",
        "High-growth environment",
      ],
    },
  ];

  const filteredJobs =
    activeFilter === "All"
      ? jobs
      : jobs.filter((job) => job.department === activeFilter);

  const jobsByDepartment = {
    Design: jobs.filter((j) => j.department === "Design"),
    Development: jobs.filter((j) => j.department === "Development"),
    Marketing: jobs.filter((j) => j.department === "Marketing"),
    Strategy: jobs.filter((j) => j.department === "Strategy"),
  };

  const handleApply = (job: Job) => {
    setSelectedJob(job);
    setDialogOpen(true);
  };

  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
    setJobDetailsOpen(true);
  };

  const handleApplySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const resume = (form.elements.namedItem("resume") as HTMLInputElement)
      .files?.[0];
    const coverLetter = (
      form.elements.namedItem("coverLetter") as HTMLTextAreaElement
    ).value;

    if (!selectedJob) {
      console.error("No job selected");
      alert("No job selected. Please try again.");
      return;
    }

    const formData = new FormData();

    if (resume) {
      formData.append("attachments", resume);
    }
    if (coverLetter) {
      const coverBlob = new Blob([coverLetter], { type: "text/plain" });
      formData.append("attachments", coverBlob, "cover_letter.txt");
    }

    formData.append("to", COMPANY_EMAIL);
    formData.append(
      "subject",
      `${selectedJob.title} - Application from ${name}`
    );

    const html = `
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Job Title:</strong> ${selectedJob.title}</p>
    <p>See attached resume and cover letter for details.</p>
  `;
    formData.append("html", html);

    const text = `Name: ${name}\nEmail: ${email}\nJob Title: ${selectedJob.title}\nSee attached resume and cover letter for details.`;
    formData.append("text", text);

    try {
      const response = await fetch(`${API_URL}/api/email/send`, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        console.log("Application sent successfully");
        alert("Your application has been sent successfully!");
        setDialogOpen(false);
      } else {
        let errorMessage = "Unknown error occurred.";
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || response.statusText;
        } catch {
          errorMessage = response.statusText || "Failed to send application.";
        }
        console.error("Failed to send application:", errorMessage);
        alert(`Failed to send application: ${errorMessage}`);
      }
    } catch (err) {
      console.error("Error sending application:", err);
      alert("Error sending application: Network error or server unreachable.");
    }
  };

  // Updated handlePortfolioSubmit function
  const handlePortfolioSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem("portfolioName") as HTMLInputElement)
      .value;
    const email = (
      form.elements.namedItem("portfolioEmail") as HTMLInputElement
    ).value;
    const url = (form.elements.namedItem("portfolioUrl") as HTMLInputElement)
      .value;
    const file = (form.elements.namedItem("portfolioFile") as HTMLInputElement)
      .files?.[0];
    const message = (
      form.elements.namedItem("portfolioMessage") as HTMLTextAreaElement
    ).value;

    const formData = new FormData();

    if (file) {
      formData.append("attachments", file);
    }
    if (message) {
      const messageBlob = new Blob([message], { type: "text/plain" });
      formData.append("attachments", messageBlob, "message.txt");
    }

    formData.append("to", COMPANY_EMAIL);
    formData.append("subject", `Portfolio Submission from ${name}`);

    const html = `
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Portfolio URL:</strong> ${url || "N/A"}</p>
    <p>See attached portfolio/resume and message for details.</p>
  `;
    formData.append("html", html);

    const text = `Name: ${name}\nEmail: ${email}\nPortfolio URL: ${
      url || "N/A"
    }\nSee attached portfolio/resume and message for details.`;
    formData.append("text", text);

    try {
      const response = await fetch(`${API_URL}/api/email/send`, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        console.log("Portfolio sent successfully");
        alert("Your portfolio has been sent successfully!");
        setPortfolioDialogOpen(false);
      } else {
        let errorMessage = "Unknown error occurred.";
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || response.statusText;
        } catch {
          errorMessage = response.statusText || "Failed to send portfolio.";
        }
        console.error("Failed to send portfolio:", errorMessage);
        alert(`Failed to send portfolio: ${errorMessage}`);
      }
    } catch (err) {
      console.error("Error sending portfolio:", err);
      alert("Error sending portfolio: Network error or server unreachable.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Back to Home Button */}
          <Link
            to="https://www.virtualtechx.com/home-1.html"
            className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 bg-black border border-zinc-800 rounded-full text-white hover:bg-zinc-800 hover:border-[#FFAC3E] transition-all duration-300"
          >
            <Home className="w-5 h-5 text-[#FFAC3E]" />
            <span className="text-sm">Back to Home</span>
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-black border border-zinc-800 rounded-full mb-6">
              <Briefcase className="w-4 h-4 text-[#FFAC3E]" />
              <span className="text-sm text-zinc-400">We're Hiring</span>
            </div>

            <h1
              className="mb-6 text-white"
              style={{ fontSize: "3.5rem", fontWeight: 700, lineHeight: 1.1 }}
            >
              Current Openings
            </h1>

            <p
              className="text-zinc-400 max-w-3xl mx-auto"
              style={{ fontSize: "1.125rem" }}
            >
              Explore roles across our creative, tech, and strategy teams. Join
              us in building the future of design and innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-8 px-6 sticky top-0 bg-black/95 backdrop-blur-lg z-40 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setActiveFilter(dept)}
                className={`px-6 py-2.5 rounded-full transition-all duration-300 ${
                  activeFilter === dept
                    ? "bg-[#FFAC3E] text-black"
                    : "bg-black text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {activeFilter === "All" ? (
            // Department Expandable View
            <div className="space-y-6">
              {Object.entries(jobsByDepartment).map(([dept, deptJobs]) => (
                <motion.div
                  key={dept}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-black/50 border border-zinc-800 rounded-2xl overflow-hidden hover:border-[#FFAC3E]/30 transition-all duration-300"
                >
                  {/* Department Header */}
                  <button
                    onClick={() =>
                      setExpandedDept(expandedDept === dept ? null : dept)
                    }
                    className="w-full px-8 py-6 flex items-center justify-between hover:bg-black/70 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#FFAC3E]/10 border border-[#FFAC3E]/30 rounded-lg flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-[#FFAC3E]" />
                      </div>
                      <div className="text-left">
                        <h2
                          className="text-white"
                          style={{ fontSize: "1.5rem" }}
                        >
                          {dept} Team
                        </h2>
                        <p className="text-zinc-500 text-sm">
                          {deptJobs.length} Open Position
                          {deptJobs.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-6 h-6 text-[#FFAC3E] transition-transform duration-300 ${
                        expandedDept === dept ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Job Cards Grid */}
                  {expandedDept === dept && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-8 pb-8"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {deptJobs.map((job, index) => (
                          <JobCard
                            key={index}
                            job={job}
                            onApply={handleApply}
                            onViewDetails={handleViewDetails}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            // Filtered Grid View
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job, index) => (
                <JobCard
                  key={index}
                  job={job}
                  onApply={handleApply}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 px-6 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="mb-4 text-white"
              style={{ fontSize: "2.5rem", fontWeight: 700 }}
            >
              Didn't find your role?
            </h2>
            <p className="text-zinc-400 mb-8" style={{ fontSize: "1.125rem" }}>
              We're always looking for creative minds. Send us your portfolio
              and let's talk.
            </p>
            <Button
              onClick={() => setPortfolioDialogOpen(true)}
              className="bg-[#FFAC3E] hover:bg-[#FF9A1E] text-black px-8 py-6 border-0 group"
            >
              Send Your Portfolio
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Application Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-black text-white border-zinc-800 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white" style={{ fontSize: "1.5rem" }}>
              Apply for {selectedJob?.title}
            </DialogTitle>
            <DialogDescription className="text-zinc-400">
              {selectedJob?.level} • {selectedJob?.department} Team
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleApplySubmit} className="space-y-6 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                required
                className="bg-black border-zinc-800 text-white placeholder:text-zinc-600 focus:border-[#FFAC3E]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john.doe@example.com"
                required
                className="bg-black border-zinc-800 text-white placeholder:text-zinc-600 focus:border-[#FFAC3E]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="resume" className="text-white">
                Resume (PDF/DOC)
              </Label>
              <Input
                id="resume"
                name="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                required
                className="bg-black border-zinc-800 text-white file:text-white file:bg-[#FFAC3E]/20 file:border-[#FFAC3E]/30 focus:border-[#FFAC3E]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverLetter" className="text-white">
                Cover Letter
              </Label>
              <Textarea
                id="coverLetter"
                name="coverLetter"
                placeholder="Tell us why you're a great fit for this role..."
                rows={6}
                required
                className="bg-black border-zinc-800 text-white placeholder:text-zinc-600 focus:border-[#FFAC3E]"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-[#FFAC3E] hover:bg-[#FF9A1E] text-black border-0"
              >
                Submit Application
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
                className="bg-transparent border-zinc-800 hover:bg-black text-white"
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Portfolio Submission Dialog */}
      <Dialog open={portfolioDialogOpen} onOpenChange={setPortfolioDialogOpen}>
        <DialogContent className="bg-zinc-950 border-zinc-800 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white" style={{ fontSize: "1.5rem" }}>
              Send Your Portfolio
            </DialogTitle>
            <DialogDescription className="text-zinc-400">
              Share your work with us. We'll get back to you soon.
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-6" onSubmit={handlePortfolioSubmit}>
            <div className="space-y-2">
              <Label htmlFor="portfolioName" className="text-white">
                Full Name
              </Label>
              <Input
                id="portfolioName"
                name="portfolioName"
                type="text"
                placeholder="John Doe"
                required
                className="bg-black border-zinc-800 text-white placeholder:text-zinc-600 focus:border-[#FFAC3E]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="portfolioEmail" className="text-white">
                Email
              </Label>
              <Input
                id="portfolioEmail"
                name="portfolioEmail"
                type="email"
                placeholder="john@example.com"
                required
                className="bg-black border-zinc-800 text-white placeholder:text-zinc-600 focus:border-[#FFAC3E]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="portfolioUrl" className="text-white">
                Portfolio URL
              </Label>
              <Input
                id="portfolioUrl"
                name="portfolioUrl"
                type="url"
                placeholder="https://yourportfolio.com"
                className="bg-black border-zinc-800 text-white placeholder:text-zinc-600 focus:border-[#FFAC3E]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="portfolioFile" className="text-white">
                Portfolio / Resume (Optional)
              </Label>
              <Input
                id="portfolioFile"
                name="portfolioFile"
                type="file"
                accept=".pdf,.doc,.docx"
                className="bg-black border-zinc-800 text-white file:text-white file:bg-zinc-800 file:border-0 file:rounded file:px-3 file:py-1 file:mr-3 hover:file:bg-zinc-700 focus:border-[#FFAC3E]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="portfolioMessage" className="text-white">
                Message
              </Label>
              <Textarea
                id="portfolioMessage"
                name="portfolioMessage"
                placeholder="Tell us a bit about yourself and what you're looking for..."
                rows={4}
                className="bg-black border-zinc-800 text-white placeholder:text-zinc-600 focus:border-[#FFAC3E]"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-[#FFAC3E] hover:bg-[#FF9A1E] text-black border-0"
              >
                Send Portfolio
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setPortfolioDialogOpen(false)}
                className="bg-transparent border-zinc-800 hover:bg-black text-white"
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Job Details Dialog */}
      <Dialog open={jobDetailsOpen} onOpenChange={setJobDetailsOpen}>
        <DialogContent className="bg-white border-zinc-200 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-start justify-between mb-2">
              <div>
                <DialogTitle
                  className="text-black mb-2"
                  style={{ fontSize: "1.75rem" }}
                >
                  {selectedJob?.title}
                </DialogTitle>
                <div className="flex flex-wrap gap-3 text-sm">
                  <span className="inline-block px-3 py-1 bg-[#FFAC3E]/10 border border-[#FFAC3E]/30 rounded-full text-[#FFAC3E]">
                    {selectedJob?.level}
                  </span>
                  <span className="flex items-center gap-1 text-zinc-600">
                    <MapPin className="w-4 h-4" />
                    {selectedJob?.location}
                  </span>
                  <span className="flex items-center gap-1 text-zinc-600">
                    <Clock className="w-4 h-4" />
                    {selectedJob?.type}
                  </span>
                </div>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6 mt-6">
            {/* Full Description */}
            {selectedJob?.fullDescription && (
              <div>
                <h3
                  className="text-white mb-3"
                  style={{ fontSize: "1.125rem" }}
                >
                  About the Role
                </h3>
                <p className="text-zinc-700 leading-relaxed">
                  {selectedJob.fullDescription}
                </p>
              </div>
            )}

            {/* Responsibilities */}
            {selectedJob?.responsibilities &&
              selectedJob.responsibilities.length > 0 && (
                <div>
                  <h3
                    className="text-white mb-3"
                    style={{ fontSize: "1.125rem" }}
                  >
                    Key Responsibilities
                  </h3>
                  <ul className="space-y-2">
                    {selectedJob.responsibilities.map((item, index) => (
                      <li key={index} className="flex gap-3 text-zinc-700">
                        <span className="text-[#FFAC3E] mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {/* Qualifications */}
            {selectedJob?.qualifications &&
              selectedJob.qualifications.length > 0 && (
                <div>
                  <h3
                    className="text-white mb-3"
                    style={{ fontSize: "1.125rem" }}
                  >
                    Qualifications
                  </h3>
                  <ul className="space-y-2">
                    {selectedJob.qualifications.map((item, index) => (
                      <li key={index} className="flex gap-3 text-zinc-700">
                        <span className="text-[#FFAC3E] mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {/* Benefits */}
            {selectedJob?.benefits && selectedJob.benefits.length > 0 && (
              <div>
                <h3
                  className="text-white mb-3"
                  style={{ fontSize: "1.125rem" }}
                >
                  What We Offer
                </h3>
                <ul className="space-y-2">
                  {selectedJob.benefits.map((item, index) => (
                    <li key={index} className="flex gap-3 text-zinc-700">
                      <span className="text-[#FFAC3E] mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-6 mt-6 border-t border-zinc-200">
            <Button
              onClick={() => {
                setJobDetailsOpen(false);
                setDialogOpen(true);
              }}
              className="flex-1 bg-[#FFAC3E] hover:bg-[#FF9A1E] text-black border-0"
            >
              Apply for this Position
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setJobDetailsOpen(false)}
              className="bg-transparent border-zinc-300 hover:bg-zinc-100 text-black"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function JobCard({
  job,
  onApply,
  onViewDetails,
}: {
  job: Job;
  onApply: (job: Job) => void;
  onViewDetails: (job: Job) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 hover:border-[#FFAC3E] hover:shadow-lg hover:shadow-[#FFAC3E]/10 transition-all duration-300 group"
    >
      <div className="mb-4">
        <div className="flex items-start justify-between mb-3">
          <span className="inline-block px-3 py-1 bg-[#FFAC3E]/10 border border-[#FFAC3E]/30 rounded-full text-sm text-[#FFAC3E]">
            {job.level}
          </span>
        </div>

        <h3 className="text-white mb-2" style={{ fontSize: "1.25rem" }}>
          {job.title}
        </h3>

        <p className="text-zinc-400 mb-4 line-clamp-2">{job.description}</p>
      </div>

      <div className="flex flex-wrap gap-4 mb-6 text-sm text-zinc-500">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{job.type}</span>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={() => onViewDetails(job)}
          variant="outline"
          className="flex-1 bg-transparent border-2 border-zinc-800 hover:border-white hover:bg-zinc-800 text-white transition-all duration-300"
        >
          View Details
        </Button>
        <Button
          onClick={() => onApply(job)}
          className="flex-1 bg-transparent border-2 border-[#FFAC3E]/50 hover:border-[#FFAC3E] hover:bg-[#FFAC3E] hover:text-black text-[#FFAC3E] transition-all duration-300 group/btn"
        >
          Apply
          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </div>
    </motion.div>
  );
}
