"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Mail, 
  Search, 
  Copy, 
  Check, 
  BookOpen, 
  SlidersHorizontal,
  LayoutGrid,
  List,
  Sparkles,
  HelpCircle
} from "lucide-react";
import { FaLinkedin as Linkedin } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogTrigger 
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";

type TemplateType = "email" | "linkedin";

interface Template {
  id: string;
  title: string;
  type: TemplateType;
  category: string;
  tone: string;
  description: string;
  subject?: string;
  body: string;
  openRate: number;
  replyRate: number;
  audience: string;
  tags: string[];
}

// Categories list
const categories = [
  { name: "All Templates", countKey: "all" },
  { name: "Cold Outreach", countKey: "Cold Outreach" },
  { name: "Follow-Up", countKey: "Follow-Up" },
  { name: "Sales", countKey: "Sales" },
  { name: "Marketing", countKey: "Marketing" },
  { name: "Onboarding", countKey: "Onboarding" },
  { name: "Re-engagement", countKey: "Re-engagement" },
  { name: "Partnership", countKey: "Partnership" },
  { name: "Feedback", countKey: "Feedback" },
  { name: "Trial & Upsell", countKey: "Trial & Upsell" },
  { name: "Referral", countKey: "Referral" },
  { name: "Event", countKey: "Event" },
  { name: "Past-Meeting", countKey: "Past-Meeting" },
  { name: "Sequence", countKey: "Sequence" }
];

// Tones list
const tones = [
  "All Tones",
  "Professional",
  "Friendly",
  "Casual",
  "Formal",
  "Persuasive",
  "Empathetic",
  "Authoritative"
];

// Demo Templates array containing 34 Email Templates + 20 LinkedIn Templates = 54 Total Templates
const templatesData: Template[] = [
  // ──────────────────────────────────────────
  // ── EMAIL TEMPLATES (34) ──
  // ──────────────────────────────────────────
  {
    id: "e1",
    title: "Enterprise ROI Analysis",
    type: "email",
    category: "Sales",
    tone: "Persuasive",
    description: "Data-driven pitch focusing on concrete financial metrics and operational efficiency.",
    subject: "Operational efficiency at {{Company_Name}} / Potential {{Metric}} ROI",
    body: "Hi {{First_Name}},\n\nIn reviewing {{Company_Name}}'s recent expansion in the APAC region, I noticed potential bottlenecks in your outbound infrastructure.\n\nWe partner with enterprise teams similar to yours, typically delivering a {{Metric}} increase in deliverability within the first quarter.\n\nAre you open to a brief alignment call next Tuesday to discuss if this model fits your current initiatives?\n\nBest regards,\n{{Sender_Name}}",
    openRate: 68,
    replyRate: 14,
    audience: "Enterprise",
    tags: ["enterprise", "ROI", "executive", "data-driven"]
  },
  {
    id: "e2",
    title: "Strategic Competitor Displacement",
    type: "email",
    category: "Sales",
    tone: "Persuasive",
    description: "Positioning your solution as the premium alternative to legacy infrastructure.",
    subject: "Migrating from {{Competitor_Name}} - A strategic approach",
    body: "Hi {{First_Name}},\n\nMany forward-thinking revenue leaders we consult have recently transitioned away from legacy systems like {{Competitor_Name}}.\n\nPost-migration, our partners typically realize a 3x increase in campaign velocity and a significant reduction in operational overhead.\n\nDo you have 10 minutes this week to explore how {{Company_Name}} could realize similar gains?\n\nBest,\n{{Sender_Name}}",
    openRate: 64,
    replyRate: 12,
    audience: "SaaS",
    tags: ["sales", "displacement", "strategic", "migration"]
  },
  {
    id: "e3",
    title: "Exclusive Cohort Invitation",
    type: "email",
    category: "Sales",
    tone: "Persuasive",
    description: "Creates professional scarcity for high-ticket pilot programs.",
    subject: "Private Pilot Request: {{Offer_Description}} closing {{Deadline}}",
    body: "Hi {{First_Name}},\n\nI wanted to ensure this didn't slip through the cracks. We are closing the applications for our exclusive Q3 pilot program on {{Deadline}}.\n\nGiven {{Company_Name}}'s market trajectory, I believe your team would be an ideal fit for this cohort.\n\nShall I tentatively reserve a slot for your organization?\n\nBest,\n{{Sender_Name}}",
    openRate: 71,
    replyRate: 18,
    audience: "Executive",
    tags: ["pilot", "exclusive", "deadline", "scarcity"]
  },
  {
    id: "e4",
    title: "Industry Leader Case Study",
    type: "email",
    category: "Sales",
    tone: "Professional",
    description: "Leverages high-profile success stories to build institutional trust.",
    subject: "How {{Similar_Company}} achieved a {{Metric}} improvement in Q2",
    body: "Hi {{First_Name}},\n\nWe recently concluded a strategic overhaul for {{Similar_Company}}, successfully engineering a {{Metric}} improvement in their core acquisition pipeline.\n\nI've compiled a brief executive summary detailing the methodology and technical implementation.\n\nWould you like me to send over the PDF?\n\nBest,\n{{Sender_Name}}",
    openRate: 55,
    replyRate: 15,
    audience: "B2B",
    tags: ["case-study", "proof", "methodology", "executive"]
  },
  {
    id: "e5",
    title: "Executive Pulse Check",
    type: "email",
    category: "Cold Outreach",
    tone: "Casual",
    description: "Low-friction, high-curiosity check-in for senior decision makers.",
    subject: "Infrastructure at {{Company_Name}}",
    body: "Hi {{First_Name}},\n\nAre you currently managing your global deliverability architecture internally, or utilizing external partners?\n\nWe are benchmarking enterprise approaches and I'd value your perspective.\n\nBest,\n{{Sender_Name}}",
    openRate: 76,
    replyRate: 24,
    audience: "C-Level",
    tags: ["curiosity", "short", "executive-pulse"]
  },
  {
    id: "e6",
    title: "Friction Point Resolution",
    type: "email",
    category: "Cold Outreach",
    tone: "Empathic",
    description: "Directly addresses a common, high-impact pain point in the industry.",
    subject: "Resolving spam placement for {{Company_Name}}",
    body: "Hi {{First_Name}},\n\nMost revenue operations leaders I consult are battling declining inbox placement rates. We've developed a proprietary diagnostic tool that autonomously rectifies SPF, DKIM, and DMARC misconfigurations.\n\nWould you be opposed to a brief demonstration of the platform's capabilities?\n\nBest,\n{{Sender_Name}}",
    openRate: 62,
    replyRate: 16,
    audience: "Ops",
    tags: ["pain-point", "diagnostic", "resolution"]
  },
  {
    id: "e7",
    title: "Milestone Acknowledgement",
    type: "email",
    category: "Cold Outreach",
    tone: "Friendly",
    description: "Highly personalized outreach triggered by a recent funding round or launch.",
    subject: "Congratulations on the {{Milestone}} announcement",
    body: "Hi {{First_Name}},\n\nI read the recent press release regarding {{Company_Name}}'s {{Milestone}}—exceptional work by you and the team.\n\nAs you scale operations post-announcement, maintaining robust sender reputation becomes critical. We specialize in ensuring hyper-growth teams sustain 99%+ deliverability.\n\nIs this on your radar for the upcoming quarter?\n\nBest,\n{{Sender_Name}}",
    openRate: 82,
    replyRate: 21,
    audience: "Startups",
    tags: ["funding", "milestone", "hyper-growth"]
  },
  {
    id: "e8",
    title: "Network Introduction",
    type: "email",
    category: "Cold Outreach",
    tone: "Friendly",
    description: "Capitalizes on a shared connection to establish immediate rapport.",
    subject: "Introduction via {{Mutual_Connection}} / Synergies with {{Company_Name}}",
    body: "Hi {{First_Name}},\n\n{{Mutual_Connection}} suggested we connect. I've been following your recent initiatives at {{Company_Name}} with great interest.\n\nWe recently collaborated with {{Mutual_Connection}}'s organization to streamline their outreach architecture. I believe there are significant parallels here.\n\nLet me know if you're open to a brief introductory call.\n\nBest,\n{{Sender_Name}}",
    openRate: 85,
    replyRate: 34,
    audience: "Network",
    tags: ["referral", "network", "warm-intro"]
  },
  {
    id: "e9",
    title: "Professional Resurface",
    type: "email",
    category: "Follow-Up",
    tone: "Casual",
    description: "A polite, low-pressure follow-up to float an email back to the top of the inbox.",
    subject: "Re: {{Previous_Subject}}",
    body: "Hi {{First_Name}},\n\nI know things move quickly. I'm just floating this back to the top of your inbox in case it was missed during a busy week.\n\nLet me know if you have bandwidth to connect next Wednesday.\n\nBest,\n{{Sender_Name}}",
    openRate: 58,
    replyRate: 14,
    audience: "General",
    tags: ["resurface", "follow-up", "polite"]
  },
  {
    id: "e10",
    title: "Value-Add Insights",
    type: "email",
    category: "Follow-Up",
    tone: "Professional",
    description: "Provides unprompted value via content or insights to re-engage.",
    subject: "Relevant insights for {{Company_Name}}'s Q3 strategy",
    body: "Hi {{First_Name}},\n\nI thought this might be highly relevant to your current focus. We just released an internal brief on optimizing deliverability protocols, which resulted in a 35% performance lift for our enterprise cohort.\n\nAccess the brief here: {{Link}}\n\nI'd be happy to walk you through how these principles apply to your architecture.\n\nBest,\n{{Sender_Name}}",
    openRate: 51,
    replyRate: 11,
    audience: "SaaS",
    tags: ["value-add", "insights", "content"]
  },
  {
    id: "e11",
    title: "Strategic Disengagement",
    type: "email",
    category: "Follow-Up",
    tone: "Formal",
    description: "The classic 'breakup' email framed professionally to elicit a final response.",
    subject: "Concluding our outreach / {{Company_Name}}",
    body: "Hi {{First_Name}},\n\nAs I haven't heard back, I will assume optimizing your outbound infrastructure isn't a strategic priority for {{Company_Name}} at this moment.\n\nI'll pause my outreach here. Should your priorities shift in the future, please don't hesitate to reach out.\n\nBest regards,\n{{Sender_Name}}",
    openRate: 72,
    replyRate: 26,
    audience: "B2B",
    tags: ["breakup", "closure", "disengagement"]
  },
  {
    id: "e12",
    title: "Product Evolution Announcement",
    type: "email",
    category: "Marketing",
    tone: "Friendly",
    description: "High-impact announcement of a significant new capability.",
    subject: "Announcing {{Feature_Name}} for Enterprise Teams",
    body: "Hi {{First_Name}},\n\nWe are thrilled to announce the rollout of {{Feature_Name}}. This new capability allows organizations like {{Company_Name}} to autonomously manage DNS configurations at scale.\n\nYou can review the technical documentation and a brief demonstration here: {{Link}}\n\nBest,\n{{Sender_Name}}",
    openRate: 48,
    replyRate: 8,
    audience: "Users",
    tags: ["marketing", "announcement", "product"]
  },
  {
    id: "e13",
    title: "Welcome onboarding sequence",
    type: "email",
    category: "Onboarding",
    tone: "Friendly",
    description: "Sent right after signup to welcome users.",
    subject: "Welcome to 360Airo, {firstName}!",
    body: "Hi {firstName},\n\nThanks for signing up! I'm {senderName}, and I'm here to help you get started.\n\nHere is your step-by-step setup guide: {link}\n\nBest,\n{senderName}",
    openRate: 72,
    replyRate: 15,
    audience: "New Customers",
    tags: ["onboarding", "welcome", "setup"]
  },
  {
    id: "e14",
    title: "Inactive User Rescue",
    type: "email",
    category: "Re-engagement",
    tone: "Casual",
    description: "Reach back out to accounts that went quiet.",
    subject: "We miss you, {firstName}",
    body: "Hi {firstName},\n\nIt's been a while since you logged in. We've added a few updates that you might love, including automated inbox checking.\n\nWant a quick tour?\n\nBest,\n{senderName}",
    openRate: 35,
    replyRate: 7,
    audience: "Inactive Users",
    tags: ["re-engage", "rescue"]
  },
  {
    id: "e15",
    title: "Co-Marketing Partnership",
    type: "email",
    category: "Partnership",
    tone: "Professional",
    description: "Pitch a joint webinar or blog post swap.",
    subject: "Co-marketing proposal: 360Airo x {companyName}",
    body: "Hi {firstName},\n\nI love {companyName}'s content on outbound tactics. I'd love to explore doing a joint webinar together on inbox algorithms.\n\nLet me know if you're open to collaboration.\n\nBest,\n{senderName}",
    openRate: 50,
    replyRate: 12,
    audience: "Partners",
    tags: ["partnership", "collaboration"]
  },
  {
    id: "e16",
    title: "Product Feedback Request",
    type: "email",
    category: "Feedback",
    tone: "Empathetic",
    description: "Ask users what they think of the software.",
    subject: "Got 2 minutes to help us improve, {firstName}?",
    body: "Hi {firstName},\n\nI'd love to know what you think of our dashboard. Any feedback helps us make the platform better for {companyName}.\n\nReply directly to this email with your thoughts!\n\nBest,\n{senderName}",
    openRate: 64,
    replyRate: 20,
    audience: "Customers",
    tags: ["feedback", "customer-love"]
  },
  {
    id: "e17",
    title: "Trial Expiring Soon",
    type: "email",
    category: "Trial & Upsell",
    tone: "Friendly",
    description: "Remind trial users to upgrade.",
    subject: "Your trial of 360Airo expires in 3 days",
    body: "Hi {firstName},\n\nHope you've enjoyed testing our deliverability suite. Your trial ends in 3 days. Upgrade today to keep your accounts running smoothly.\n\nUpgrade link: {link}\n\nBest,\n{senderName}",
    openRate: 68,
    replyRate: 15,
    audience: "Trial Users",
    tags: ["trial", "upsell", "expiry"]
  },
  {
    id: "e18",
    title: "Customer Referral Pitch",
    type: "email",
    category: "Referral",
    tone: "Friendly",
    description: "Ask happy users to refer their contacts.",
    subject: "Know anyone looking to improve deliverability?",
    body: "Hi {firstName},\n\nGlad to see your accounts are hitting 99% placement! If you know other founders who need help, refer them and get $100 credits.\n\nBest,\n{senderName}",
    openRate: 58,
    replyRate: 11,
    audience: "Customers",
    tags: ["referral", "viral"]
  },
  {
    id: "e19",
    title: "Webinar RSVP Invite",
    type: "email",
    category: "Event",
    tone: "Persuasive",
    description: "Promote registrations for an online webinar.",
    subject: "Live: Outbound Secrets of 2026",
    body: "Hi {firstName},\n\nWe're hosting a live webinar on how inbox filters are changing in 2026. Save your seat here: {link}.\n\nBest,\n{senderName}",
    openRate: 46,
    replyRate: 8,
    audience: "General",
    tags: ["event", "webinar", "invite"]
  },
  {
    id: "e20",
    title: "Thanks for meeting today",
    type: "email",
    category: "Past-Meeting",
    tone: "Professional",
    description: "Follow up immediately after a demo call.",
    subject: "Thanks for your time today, {firstName}",
    body: "Hi {firstName},\n\nLoved learning about {companyName} today. As promised, here are the pricing sheets and onboarding guide: {link}.\n\nBest,\n{senderName}",
    openRate: 85,
    replyRate: 35,
    audience: "Prospects",
    tags: ["meeting", "followup", "notes"]
  },
  {
    id: "e21",
    title: "Drip sequence email #1",
    type: "email",
    category: "Sequence",
    tone: "Friendly",
    description: "Initial educational post in a drip series.",
    subject: "Step 1/5: Fixing your SPF alignment",
    body: "Hi {firstName},\n\nHere is step 1 to fix your domain. Make sure to log into DNS settings and append: `include:360airo.com` to your SPF record.\n\nBest,\n{senderName}",
    openRate: 55,
    replyRate: 10,
    audience: "General",
    tags: ["sequence", "educational"]
  },
  // Adding remaining email templates to reach exactly 34 Email Templates
  { id: "e22", title: "Discount Announcement", type: "email", category: "Marketing", tone: "Persuasive", description: "Seasonal sales discount code.", subject: "Get 25% off 360Airo this Black Friday", body: "Use coupon code BF25 at checkout.", openRate: 39, replyRate: 7, audience: "Prospects", tags: ["marketing", "sale"] },
  { id: "e23", title: "Case Study: Scaling to $10M", type: "email", category: "Marketing", tone: "Authoritative", description: "Sharing a growth story.", subject: "How this startup scaled using cold email", body: "Check out the case study: {link}", openRate: 45, replyRate: 9, audience: "SaaS", tags: ["marketing", "case-study"] },
  { id: "e24", title: "Newsletter Weekly", type: "email", category: "Marketing", tone: "Friendly", description: "Weekly industry news round-up.", subject: "Deliverability newsletter: Issue #42", body: "Here is your weekly deliverability advice...", openRate: 32, replyRate: 4, audience: "Subscribers", tags: ["marketing", "newsletter"] },
  { id: "e25", title: "Day 3 Setup Check-In", type: "email", category: "Onboarding", tone: "Friendly", description: "Help users who haven't sent yet.", subject: "Need help connecting your domain, {firstName}?", body: "I noticed you haven't added a mailbox yet. Let me know if you need help.", openRate: 68, replyRate: 25, audience: "New Users", tags: ["onboarding", "check-in"] },
  { id: "e26", title: "Day 14 Progress Report", type: "email", category: "Onboarding", tone: "Friendly", description: "Show success stats.", subject: "Your 360Airo report: 99% placement achieved!", body: "Here is your progress report for {companyName}...", openRate: 75, replyRate: 12, audience: "Customers", tags: ["onboarding", "stats"] },
  { id: "e27", title: "Feedback: Post Purchase", type: "email", category: "Feedback", tone: "Casual", description: "Feedback immediately after upgrade.", subject: "Quick question on your checkout experience", body: "How was the upgrade process? Just reply with a rating 1-10.", openRate: 59, replyRate: 24, audience: "Customers", tags: ["feedback", "upgrade"] },
  { id: "e28", title: "Re-engagement: Free Credits", type: "email", category: "Re-engagement", tone: "Persuasive", description: "Offer free credits to return.", subject: "We added 100 free credits to your workspace", body: "Log back in to claim them: {link}", openRate: 47, replyRate: 15, audience: "Inactive Users", tags: ["re-engage", "rescue"] },
  { id: "e29", title: "Partnership: Affiliate Program", type: "email", category: "Partnership", tone: "Professional", description: "Invite to affiliate program.", subject: "Earn 30% recurring by promoting 360Airo", body: "Apply for our affiliate pilot here: {link}", openRate: 42, replyRate: 8, audience: "Partners", tags: ["partnership", "affiliate"] },
  { id: "e30", title: "Upsell: Annual Plan Saver", type: "email", category: "Trial & Upsell", tone: "Persuasive", description: "Offer savings for switching to annual.", subject: "Save 40% on your annual subscription", body: "Switch to annual this week and save $240.", openRate: 52, replyRate: 10, audience: "Monthly Users", tags: ["upsell", "annual"] },
  { id: "e31", title: "Cold Pitch: Direct Meeting", type: "email", category: "Cold Outreach", tone: "Formal", description: "Direct request for an calendar invite.", subject: "Calendar invite: 360Airo x {companyName}", body: "Hi {firstName}, would you be open to a 10-minute demo on deliverability next Wednesday at 10 AM?", openRate: 40, replyRate: 8, audience: "Enterprise", tags: ["cold", "pitch"] },
  { id: "e32", title: "Cold Pitch: Value Audit", type: "email", category: "Cold Outreach", tone: "Persuasive", description: "Send a custom audit screenshot.", subject: "Deliverability report for {domain}", body: "Hi {firstName}, I ran a check on your domain and noticed a SPF config error. Let me know if you want the fix.", openRate: 58, replyRate: 19, audience: "B2B", tags: ["cold", "audit"] },
  { id: "e33", title: "Quick Bump: No link", type: "email", category: "Follow-Up", tone: "Casual", description: "Short follow-up without links.", subject: "Re: deliverability check", body: "Hi {firstName}, just wanted to see if you had a moment to review this? Thanks, {senderName}", openRate: 48, replyRate: 14, audience: "General", tags: ["followup", "bump"] },
  { id: "e34", title: "Follow-Up: Value Drop", type: "email", category: "Follow-Up", tone: "Friendly", description: "Send useful tip.", subject: "Thought you'd like this SPF hack", body: "Hi {firstName}, we found that flattening SPF records improves Google placement by 15%. Thought of you.", openRate: 49, replyRate: 11, audience: "SaaS", tags: ["followup", "value"] },

  // ──────────────────────────────────────────
  // ── LINKEDIN TEMPLATES (20) ──
  // ──────────────────────────────────────────
  {
    id: "l1",
    title: "LinkedIn Connection Note",
    type: "linkedin",
    category: "Cold Outreach",
    tone: "Friendly",
    description: "Clean connection message under 300 characters.",
    body: "Hi {firstName}, saw your posts on sales automation and loved the insights. Let's connect here!\n\nBest,\n{senderName}",
    openRate: 75,
    replyRate: 28,
    audience: "B2B",
    tags: ["linkedin", "connect", "short"]
  },
  {
    id: "l2",
    title: "Post Engagement Hook",
    type: "linkedin",
    category: "Cold Outreach",
    tone: "Friendly",
    description: "Reach out referencing their recent comment.",
    body: "Hi {firstName}, saw your comment on {influencerName}'s post about deliverability. Totally agree that SPF flattening is key. Would love to share how we automated it.\n\nBest,\n{senderName}",
    openRate: 80,
    replyRate: 35,
    audience: "SaaS",
    tags: ["linkedin", "post-hook", "cold"]
  },
  {
    id: "l3",
    title: "SaaS Sales Pitch",
    type: "linkedin",
    category: "Sales",
    tone: "Persuasive",
    description: "InMail pitch targeted towards SaaS leaders.",
    body: "Hi {firstName}, I noticed {companyName} is expanding sales. Low inbox rates can kill growth. We help sales teams land in the inbox 99% of the time. Are you open to a quick chat next week?",
    openRate: 65,
    replyRate: 18,
    audience: "SaaS",
    tags: ["linkedin", "sales", "inmail"]
  },
  {
    id: "l4",
    title: "Soft Follow-up Bump",
    type: "linkedin",
    category: "Follow-Up",
    tone: "Casual",
    description: "Follow up directly in LinkedIn message thread.",
    body: "Hey {firstName}, just checking if you had a second to look at this? Let me know!",
    openRate: 88,
    replyRate: 40,
    audience: "General",
    tags: ["linkedin", "followup", "short"]
  },
  {
    id: "l5",
    title: "Mutual Group Member Pitch",
    type: "linkedin",
    category: "Partnership",
    tone: "Casual",
    description: "Target members of same LinkedIn groups.",
    body: "Hi {firstName}, noticed we are both in the Outbound SaaS group. I'm looking to partner on co-webinars. Let's connect!",
    openRate: 78,
    replyRate: 22,
    audience: "Partners",
    tags: ["linkedin", "group", "partner"]
  },
  {
    id: "l6",
    title: "Marketing: Article Share",
    type: "linkedin",
    category: "Marketing",
    tone: "Friendly",
    description: "Share your latest LinkedIn pulse article.",
    body: "Hey {firstName}, just published an article on DMARC policies. Thought you'd appreciate it: {link}",
    openRate: 62,
    replyRate: 12,
    audience: "Subscribers",
    tags: ["linkedin", "marketing"]
  },
  {
    id: "l7",
    title: "Welcome Onboarding Note",
    type: "linkedin",
    category: "Onboarding",
    tone: "Friendly",
    description: "Add signup users on LinkedIn.",
    body: "Hi {firstName}, welcome to 360Airo! I saw you just registered, wanted to say hello here as well.",
    openRate: 92,
    replyRate: 48,
    audience: "Customers",
    tags: ["linkedin", "onboarding"]
  },
  {
    id: "l8",
    title: "Inactive User Check-in",
    type: "linkedin",
    category: "Re-engagement",
    tone: "Casual",
    description: "Re-engage clients on social media.",
    body: "Hey {firstName}, how is deliverability looking at {companyName}? We rolled out some new automation features if you want to hop back in.",
    openRate: 82,
    replyRate: 25,
    audience: "Inactive Users",
    tags: ["linkedin", "rescue"]
  },
  {
    id: "l9",
    title: "Trial Help Desk",
    type: "linkedin",
    category: "Trial & Upsell",
    tone: "Empathetic",
    description: "Help trial clients before expiration.",
    body: "Hi {firstName}, saw your trial expires in a few days. Let me know if you need me to extend it or help you upgrade.",
    openRate: 88,
    replyRate: 38,
    audience: "Trial Users",
    tags: ["linkedin", "upsell"]
  },
  {
    id: "l10",
    title: "Client Referral Ask",
    type: "linkedin",
    category: "Referral",
    tone: "Friendly",
    description: "Ask for referral via LinkedIn.",
    body: "Hey {firstName}, glad we could fix your DNS setups! If you know other founders looking for high placement, send them my way.",
    openRate: 85,
    replyRate: 24,
    audience: "Customers",
    tags: ["linkedin", "referral"]
  },
  {
    id: "l11",
    title: "Event RSVP Bump",
    type: "linkedin",
    category: "Event",
    tone: "Casual",
    description: "Invite LinkedIn contacts to live audio event.",
    body: "Hi {firstName}, hosting an Audio Event on deliverability changes next Tuesday. Register here: {link}",
    openRate: 70,
    replyRate: 15,
    audience: "General",
    tags: ["linkedin", "event"]
  },
  {
    id: "l12",
    title: "Post Demo Note",
    type: "linkedin",
    category: "Past-Meeting",
    tone: "Professional",
    description: "Follow up on social media after calendar demo.",
    body: "Thanks for the chat today {firstName}! Let's stay in touch here.",
    openRate: 98,
    replyRate: 55,
    audience: "Prospects",
    tags: ["linkedin", "meeting"]
  },
  {
    id: "l13",
    title: "Sequence Follow-up #1",
    type: "linkedin",
    category: "Sequence",
    tone: "Friendly",
    description: "Second message in multi-touch sequence.",
    body: "Hey {firstName}, sent you an email last Tuesday regarding your domain health. Just checking here as well.",
    openRate: 81,
    replyRate: 31,
    audience: "General",
    tags: ["linkedin", "sequence"]
  },
  { id: "l14", title: "Sales: Core Demo Invite", type: "linkedin", category: "Sales", tone: "Persuasive", description: "Direct InMail proposal.", body: "Hi {firstName}, open to a 5 min screen-share on how we scale email campaigns?", openRate: 70, replyRate: 19, audience: "SaaS", tags: ["linkedin", "sales"] },
  { id: "l15", title: "Sales: Profile Viewer Hook", type: "linkedin", category: "Sales", tone: "Casual", description: "Pitch to profile viewers.", body: "Hey {firstName}, saw you viewed my profile. I help team scale inbox metrics. Let's chat.", openRate: 84, replyRate: 30, audience: "B2B", tags: ["linkedin", "sales"] },
  { id: "l16", title: "Cold Connect: Local Founder", type: "linkedin", category: "Cold Outreach", tone: "Friendly", description: "Connect with local community.", body: "Hey {firstName}, saw you're also in {cityName}. Scaling outbound is hard here. Let's swap tips.", openRate: 79, replyRate: 38, audience: "Founders", tags: ["linkedin", "connect"] },
  { id: "l17", title: "Cold Connect: Same Uni", type: "linkedin", category: "Cold Outreach", tone: "Friendly", description: "Alumni networking pitch.", body: "Hi {firstName}, great to see a fellow alum from {universityName} doing great things at {companyName}. Let's connect!", openRate: 83, replyRate: 42, audience: "Alumni", tags: ["linkedin", "connect"] },
  { id: "l18", title: "Feedback Request: Beta Feature", type: "linkedin", category: "Feedback", tone: "Friendly", description: "Invite to closed beta.", body: "Hey {firstName}, launching a new DMARC checker beta next week. Want to test it out?", openRate: 88, replyRate: 36, audience: "Beta Testers", tags: ["linkedin", "feedback"] },
  { id: "l19", title: "Re-engage: Job Change Alert", type: "linkedin", category: "Re-engagement", tone: "Friendly", description: "Congratulate job change and pitch.", body: "Congrats on your new role at {companyName}, {firstName}! Let's see if we can help set up deliverability.", openRate: 89, replyRate: 41, audience: "Prospects", tags: ["linkedin", "re-engage"] },
  { id: "l20", title: "Joint Outreach Proposal", type: "linkedin", category: "Partnership", tone: "Professional", description: "B2B collaboration pitch.", body: "Hi {firstName}, saw your company focuses on outbound lead gen. We specialize in inbox health. Let's do a referral swap.", openRate: 74, replyRate: 20, audience: "Partners", tags: ["linkedin", "partner"] }
];
const dummyValues: Record<string, string> = {
  "Company Name": "Acme Corp",
  "First Name": "Sarah",
  "Metric": "32% increase",
  "Competitor Name": "LegacyTech",
  "Deadline": "this Friday",
  "Similar Company": "TechFlow Inc",
  "Offer Description": "Enterprise Trial",
  "Milestone": "Series B Funding",
  "Mutual Connection": "David Smith",
  "Previous Subject": "Partnership Opportunity",
  "Sender Name": "Ayush",
  "Link": "link.360airo.com/demo",
  "Feature Name": "Auto-Warmup 2.0"
};

const formatTemplateText = (text: string) => {
  if (!text) return null;
  const parts = text.split(/(\{\{?[^}]+?\}\}?)/g);
  return (
    <>
      {parts.map((part, i) => {
        if ((part.startsWith("{{") && part.endsWith("}}")) || (part.startsWith("{") && part.endsWith("}"))) {
          const rawVarName = part.replace(/[{}]/g, "").replace(/_/g, " ");
          
          // Try to find a dummy value for the variable (case-insensitive)
          const normalizedVarName = rawVarName.toLowerCase().trim();
          let dummyValue = rawVarName; // fallback to variable name
          
          for (const [key, val] of Object.entries(dummyValues)) {
            if (key.toLowerCase() === normalizedVarName) {
              dummyValue = val;
              break;
            }
          }

          return (
            <span 
              key={i} 
              className="inline-flex items-center px-1.5 py-0 mx-0.5 rounded-[4px] text-[12px] font-bold bg-indigo-500/10 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300 border border-indigo-500/20 cursor-help transition-colors"
              title={`Dynamic Variable: {{${rawVarName}}}`}
            >
              {dummyValue}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
};

export default function TemplateLibraryPage() {
  const [activeTab, setActiveTab] = React.useState<TemplateType>("email");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All Templates");
  const [selectedTone, setSelectedTone] = React.useState<string>("All Tones");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  // Layout mode grid or list
  const [layoutMode, setLayoutMode] = React.useState<"grid" | "list">("grid");

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  // Filter templates list
  const filteredTemplates = templatesData.filter(t => {
    const matchesTab = t.type === activeTab;
    const matchesCategory = selectedCategory === "All Templates" || t.category === selectedCategory;
    const matchesTone = selectedTone === "All Tones" || t.tone === selectedTone;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (t.subject && t.subject.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesCategory && matchesTone && matchesSearch;
  });

  // Calculate totals
  const totalEmailsCount = templatesData.filter(t => t.type === "email").length;
  const totalLinkedinCount = templatesData.filter(t => t.type === "linkedin").length;
  
  // Count unique categories represented in data
  const uniqueCategoriesCount = Array.from(new Set(templatesData.map(t => t.category))).length;

  return (
    <div className="space-y-6">
      
      {/* ── HEADER SECTION ── */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-end space-y-4 md:space-y-0">
        {/* Top Right stats widgets */}
        <div className="flex items-center space-x-6 bg-slate-50 dark:bg-[#121215]/40 border border-slate-200 dark:border-border/10 px-5 py-2.5 rounded-2xl">
          <div className="flex flex-col text-center">
            <span className="text-lg font-black text-slate-950 dark:text-white">{totalEmailsCount}</span>
            <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-wider mt-0.5">Email Templates</span>
          </div>
          <div className="h-6 w-[1px] bg-slate-200 dark:bg-border/20" />
          <div className="flex flex-col text-center">
            <span className="text-lg font-black text-slate-950 dark:text-white">{totalLinkedinCount}</span>
            <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-wider mt-0.5">LinkedIn Templates</span>
          </div>
          <div className="h-6 w-[1px] bg-slate-200 dark:bg-border/20" />
          <div className="flex flex-col text-center">
            <span className="text-lg font-black text-slate-950 dark:text-white">23</span>
            <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-wider mt-0.5">Categories</span>
          </div>
        </div>
      </div>

      {/* ── TAB SELECTORS ── */}
      <div className="flex items-center space-x-1.5 p-1 bg-slate-100 dark:bg-white/5 rounded-2xl self-start w-fit shadow-inner">
        <button
          onClick={() => {
            setActiveTab("email");
            setSelectedCategory("All Templates");
          }}
          className={`flex items-center space-x-2 px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "email"
              ? "bg-blue-600 text-white shadow-md shadow-blue-500/15"
              : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          }`}
        >
          <Mail className="h-3.5 w-3.5" />
          <span>Email Templates</span>
          <Badge className={`ml-1 text-[9px] py-0 px-1.5 font-black ${activeTab === "email" ? "bg-white text-blue-600" : "bg-slate-200 text-slate-700 dark:bg-white/10 dark:text-slate-300"}`}>
            {totalEmailsCount}
          </Badge>
        </button>
        <button
          onClick={() => {
            setActiveTab("linkedin");
            setSelectedCategory("All Templates");
          }}
          className={`flex items-center space-x-2 px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "linkedin"
              ? "bg-blue-600 text-white shadow-md shadow-blue-500/15"
              : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          }`}
        >
          <Linkedin className="h-3.5 w-3.5" />
          <span>LinkedIn Templates</span>
          <Badge className={`ml-1 text-[9px] py-0 px-1.5 font-black ${activeTab === "linkedin" ? "bg-white text-blue-600" : "bg-slate-200 text-slate-700 dark:bg-white/10 dark:text-slate-300"}`}>
            {totalLinkedinCount}
          </Badge>
        </button>
      </div>

      {/* ── GRID SPLIT WORKSPACE ── */}
      <div className="grid gap-6 md:grid-cols-4 items-start text-left">
        
        {/* Left Column: Category & Tone sidebars */}
        <div className="md:col-span-1 space-y-6">
          {/* Categories Sidebar */}
          <Card className="border-slate-200/60 dark:border-border/30 bg-white dark:bg-card/45 backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(124,58,237,0.25)] dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:border-purple-500/40 dark:hover:border-purple-500/60 hover:-translate-y-1 cursor-pointer">
            <CardHeader className="pb-2 p-4 border-b border-slate-100 dark:border-border/10">
              <span className="text-[10px] font-bold text-slate-400 dark:text-muted-foreground uppercase tracking-wider">
                Categories
              </span>
            </CardHeader>
            <CardContent className="p-2 flex flex-col space-y-0.5">
              {categories.map((cat) => {
                // Calculate count dynamically
                const count = cat.countKey === "all" 
                  ? templatesData.filter(t => t.type === activeTab).length
                  : templatesData.filter(t => t.type === activeTab && t.category === cat.countKey).length;

                const isSelected = selectedCategory === cat.name;

                return (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`flex items-center justify-between px-3.5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer text-left ${
                      isSelected
                        ? "bg-blue-500/10 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/3 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <span>{cat.name}</span>
                    <Badge variant="secondary" className={`text-[9px] py-0 px-1.5 font-bold ${
                      isSelected 
                        ? "bg-blue-500/15 text-blue-600 dark:text-blue-400" 
                        : "bg-slate-100 text-slate-500 dark:bg-white/5 dark:text-slate-400"
                    }`}>
                      {count}
                    </Badge>
                  </button>
                );
              })}
            </CardContent>
          </Card>

          {/* Tone Sidebar */}
          <Card className="border-slate-200/60 dark:border-border/30 bg-white dark:bg-card/45 backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(124,58,237,0.25)] dark:hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:border-purple-500/40 dark:hover:border-purple-500/60 hover:-translate-y-1 cursor-pointer">
            <CardHeader className="pb-2 p-4 border-b border-slate-100 dark:border-border/10">
              <span className="text-[10px] font-bold text-slate-400 dark:text-muted-foreground uppercase tracking-wider">
                Tone
              </span>
            </CardHeader>
            <CardContent className="p-2 flex flex-col space-y-0.5">
              {tones.map((tName) => {
                const isSelected = selectedTone === tName;
                return (
                  <button
                    key={tName}
                    onClick={() => setSelectedTone(tName)}
                    className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer text-left ${
                      isSelected
                        ? "bg-blue-500/10 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/3 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {tName}
                  </button>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Search & templates list */}
        <div className="md:col-span-3 space-y-4">
          
          {/* Controls row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <Input
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 text-xs border-slate-200 dark:border-border/30 bg-white dark:bg-card placeholder:text-slate-400 rounded-xl shadow-xs"
              />
            </div>

            <div className="flex items-center space-x-3 self-end sm:self-auto">
              <span className="text-xs text-muted-foreground font-semibold">
                {filteredTemplates.length} templates
              </span>

              {/* Layout mode switcher */}
              <div className="flex items-center space-x-0.5 bg-slate-100 dark:bg-white/5 p-0.5 rounded-xl border border-slate-200 dark:border-border/20">
                <button 
                  onClick={() => setLayoutMode("grid")}
                  className={`p-1.5 rounded-lg cursor-pointer transition-colors ${layoutMode === "grid" ? "bg-white dark:bg-card text-blue-600 dark:text-white shadow-sm" : "text-slate-400 hover:text-slate-700 dark:hover:text-white"}`}
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                </button>
                <button 
                  onClick={() => setLayoutMode("list")}
                  className={`p-1.5 rounded-lg cursor-pointer transition-colors ${layoutMode === "list" ? "bg-white dark:bg-card text-blue-600 dark:text-white shadow-sm" : "text-slate-400 hover:text-slate-700 dark:hover:text-white"}`}
                >
                  <List className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Templates Grid / list builder */}
          <AnimatePresence mode="wait">
            {filteredTemplates.length === 0 ? (
              <motion.div
                key="empty-lib"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-16 text-center text-slate-400 dark:text-slate-500 font-semibold text-xs border border-dashed border-slate-200 dark:border-border/20 rounded-2xl"
              >
                No templates matched your criteria.
              </motion.div>
            ) : (
              <motion.div
                key="populated-lib"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={layoutMode === "grid" ? "grid gap-4 sm:grid-cols-2" : "space-y-4"}
              >
                {filteredTemplates.map((t) => (
                  <Card key={t.id} className="border-slate-200/60 dark:border-border/30 bg-white dark:bg-card/45 backdrop-blur-md rounded-2xl p-5 text-left relative overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between">
                    
                    {/* Top labels */}
                    <div className="flex items-start justify-between mb-3.5">
                      <div className="flex items-center space-x-2">
                        <div className="p-1.5 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-border/10 text-slate-500 dark:text-slate-400">
                          {t.type === "email" ? <Mail className="h-3.5 w-3.5" /> : <Linkedin className="h-3.5 w-3.5" />}
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          {t.category}
                        </span>
                      </div>
                      
                      <Badge 
                        variant="secondary" 
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-md ${
                          t.tone === "Persuasive" ? "border-orange-500/25 bg-orange-500/5 text-orange-600 dark:text-orange-400" :
                          t.tone === "Professional" ? "border-blue-500/25 bg-blue-500/5 text-blue-600 dark:text-blue-400" :
                          t.tone === "Casual" ? "border-emerald-500/25 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400" :
                          "border-slate-200 dark:border-border/20 bg-slate-50 dark:bg-card text-slate-600 dark:text-slate-300"
                        }`}
                      >
                        {t.tone}
                      </Badge>
                    </div>

                    {/* Content body */}
                    <div className="space-y-3 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-sm font-black text-slate-900 dark:text-white block">
                          {t.title}
                        </span>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 font-medium leading-relaxed">
                          {t.description}
                        </p>

                        {/* Subject lines inside code card block */}
                        {t.subject && (
                          <div className="mt-4 p-3 rounded-t-xl bg-slate-50/80 dark:bg-white/2 border border-slate-200/50 dark:border-border/10 border-b-0 space-y-1.5 relative overflow-hidden group-hover:bg-slate-50 transition-colors">
                            <span className="text-[9px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-black flex items-center gap-1.5">
                              Subject
                            </span>
                            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 block leading-snug">
                              {formatTemplateText(t.subject)}
                            </span>
                          </div>
                        )}

                        {/* Template Body */}
                        <div className={`p-4 rounded-b-xl bg-slate-50/50 dark:bg-white/2 border border-slate-200/50 dark:border-border/10 space-y-2 max-h-[150px] overflow-y-auto ${!t.subject ? 'rounded-t-xl mt-4' : ''}`}>
                          <span className="text-[9px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-black block">
                            Body Preview
                          </span>
                          <span className="text-[13px] font-medium text-slate-600 dark:text-slate-300 block whitespace-pre-line leading-relaxed">
                            {formatTemplateText(t.body)}
                          </span>
                        </div>
                      </div>

                      {/* Footer stats metric and tag chips */}
                      <div className="pt-4 border-t border-slate-100 dark:border-border/10 space-y-3 mt-4">
                        <div className="flex items-center space-x-3 text-[10px] font-bold text-slate-500 dark:text-slate-400 font-mono">
                          <span className="text-emerald-500 flex items-center gap-0.5">📈 {t.openRate}% open rate</span>
                          <span>|</span>
                          <span className="text-purple-500 flex items-center gap-0.5">💬 {t.replyRate}% reply rate</span>
                          <span>|</span>
                          <span>{t.audience}</span>
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          {t.tags.map((tag) => (
                            <span key={tag} className="text-[9px] bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-400 font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider">
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Actions buttons */}
                        <div className="grid grid-cols-2 gap-2 pt-1.5">
                          <Dialog>
                            <DialogTrigger asChild>
                              <button className="flex h-8 items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 rounded-xl text-[11px] font-bold cursor-pointer transition-all">
                                <span>Preview</span>
                              </button>
                            </DialogTrigger>
                            <DialogContent className="border border-border/40 bg-[#121215] max-w-lg text-left">
                              <DialogHeader>
                                <DialogTitle className="text-md text-white">{t.title} Preview</DialogTitle>
                                <DialogDescription className="text-xs">
                                  Category: {t.category} | Tone: {t.tone}
                                </DialogDescription>
                              </DialogHeader>

                              <div className="my-4 space-y-4 bg-slate-50 dark:bg-white/2 border border-slate-200/50 dark:border-border/20 p-5 rounded-2xl">
                                {t.subject && (
                                  <div>
                                    <span className="text-[10px] font-bold text-slate-500 dark:text-muted-foreground uppercase tracking-wider">Subject</span>
                                    <p className="text-sm font-semibold text-slate-800 dark:text-white mt-1">{formatTemplateText(t.subject)}</p>
                                  </div>
                                )}
                                <div>
                                  <span className="text-[10px] font-bold text-slate-500 dark:text-muted-foreground uppercase tracking-wider">Message Body</span>
                                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200 whitespace-pre-line leading-relaxed mt-1">{formatTemplateText(t.body)}</p>
                                </div>
                              </div>

                              <DialogFooter>
                                <Button 
                                  onClick={() => handleCopy(t.id, t.body)}
                                  variant="primary" 
                                  className="h-9 text-xs font-semibold"
                                >
                                  {copiedId === t.id ? "Copied!" : "Copy Content"}
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>

                          <button 
                            onClick={() => handleCopy(t.id, t.body)}
                            className="flex h-8 items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 rounded-xl text-[11px] font-bold cursor-pointer transition-all"
                          >
                            {copiedId === t.id ? (
                              <>
                                <Check className="h-3.5 w-3.5 text-emerald-500" />
                                <span className="text-emerald-500">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3.5 w-3.5" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                    </div>
                  </Card>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
