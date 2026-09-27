import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, HostListener, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from '../../components/about/about.component';
import { ContactComponent } from '../../components/contact/contact.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProjectsComponent } from '../../components/projects/projects.component';
import { ServicesComponent } from '../../components/services/services.component';
import { SkillsComponent } from '../../components/skills/skills.component';
type Language = 'ar' | 'en';
interface StatItem {
  value: string;
  label: string;
}
interface NavSection {
  home: string;
  about: string;
  skills: string;
  services: string;
  projects: string;
  contact: string;
  cta: string;
}
interface SkillGroup {
  title: string;
  items: string[];
}
interface ServiceItem {
  title: string;
  description: string;
}
interface ProjectItem {
  title: string;
  technology: string;
  description: string;
  tags: string[];
  image: string;
}
interface ContactFormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}
interface PortfolioContent {
  nav: NavSection;
  hero: {
    eyebrow: string;
    name: string;
    title: string;
    description: string;
    buttonPrimary: string;
    buttonSecondary: string;
    stats: StatItem[];
  };
  about: {
    heading: string;
    text: string;
    highlights: string[];
    cards: StatItem[];
  };
  skills: {
    heading: string;
    description: string;
    groups: SkillGroup[];
  };
  services: {
    heading: string;
    items: ServiceItem[];
  };
  projects: {
    heading: string;
    button: string;
    items: ProjectItem[];
  };
  contact: {
    heading: string;
    description: string;
    email: string;
    linkedin: string;
    form: {
      name: string;
      email: string;
      subject: string;
      message: string;
      submit: string;
      success: string;
      errors: {
        name: string;
        email: string;
        subject: string;
        message: string;
      };
    };
  };
  footer: {
    name: string;
    title: string;
    copyright: string;
  };
}
@Component({
  selector: 'app-portfolio-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ServicesComponent,
    ProjectsComponent,
    ContactComponent,
    FooterComponent,
  ],
  templateUrl: './portfolio-page.component.html',
  styleUrl: './portfolio-page.component.css',
})
export class PortfolioPageComponent implements AfterViewInit {
  isArabic = signal<boolean>(true);
  menuOpen = false;
  scrolled = signal(false);
  contactSuccess = false;
  private revealObserver?: IntersectionObserver;
  ngAfterViewInit(): void {
    this.observeRevealItems();
  }
  private observeRevealItems(): void {
    const revealItems = document.querySelectorAll('.reveal');
    if (!revealItems.length) {
      return;
    }
    if (this.revealObserver) {
      this.revealObserver.disconnect();
      this.revealObserver = undefined;
    }
    this.revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            this.revealObserver?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    revealItems.forEach((item) => this.revealObserver?.observe(item));
  }
  contactForm: ContactFormState = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };
  readonly arText: PortfolioContent = {
    nav: {
      home: 'الرئيسية',
      about: 'من أنا',
      skills: 'المهارات',
      services: 'الخدمات',
      projects: 'الأعمال',
      contact: 'تواصل',
      cta: 'تواصل معي',
    },
    hero: {
      eyebrow: 'مرحباً، أنا',
      name: 'سارة أحمد',
      title: 'Data Analyst & Frontend Developer',
      description:
        'أحوّل البيانات المعقدة إلى رؤى واضحة ولوحات تحكم تفاعلية، وأطوّر تطبيقات ويب عصرية باستخدام Angular و REST API.',
      buttonPrimary: 'عرض أعمالي',
      buttonSecondary: 'تواصل معي',
      stats: [
        { value: '4+', label: 'مشاريع' },
        { value: 'Frontend', label: 'تطوير واجهات' },
        { value: 'Data', label: 'تحليل بيانات' },
        { value: 'Modern', label: 'حلول حديثة' },
      ],
    },
    about: {
      heading: 'من أنا',
      text: 'متخصصة في تحويل البيانات المعقدة إلى لوحات تحكم تفاعلية واضحة، وتطوير وتكامل تطبيقات الويب العصرية باستخدام Angular و REST API بكود نظيف واحترافي.',
      highlights: ['تحليل البيانات', 'تطوير واجهات', 'Angular', 'REST API', 'لوحات تحكم تفاعلية'],
      cards: [
        { value: '4+', label: 'مشاريع' },
        { value: 'Frontend', label: 'تطوير واجهات' },
        { value: 'Data', label: 'تحليل بيانات' },
        { value: 'Modern', label: 'حلول ويب حديثة' },
      ],
    },
    skills: {
      heading: 'مهاراتي',
      description: 'أبني وتجرب حلولاً رقمية متكاملة تجمع بين التحليل البصري والتنفيذ التقني.',
      groups: [
        { title: 'Frontend', items: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Angular', 'RxJS'] },
        {
          title: 'Data',
          items: ['Power BI', 'Data Analysis', 'KPI Dashboards', 'Data Visualization'],
        },
        { title: 'Backend / API', items: ['REST API', 'HttpClient', 'API Integration'] },
        { title: 'Mobile', items: ['Flutter', 'Flutter Secure Storage'] },
      ],
    },
    services: {
      heading: 'الخدمات',
      items: [
        {
          title: 'Data Analysis & Visualization',
          description:
            'تحويل البيانات إلى تقارير ولوحات تحكم واضحة تساعد على فهم الأداء واتخاذ قرارات أفضل.',
        },
        {
          title: 'Angular Frontend Development',
          description:
            'تطوير واجهات ويب حديثة ومتجاوبة باستخدام Angular مع كتابة كود منظم وقابل للصيانة.',
        },
        {
          title: 'REST API Integration',
          description:
            'ربط تطبيقات الويب مع REST APIs باستخدام HttpClient و RxJS مع التعامل المنظم مع حالات التحميل والأخطاء.',
        },
        {
          title: 'Responsive Web Development',
          description: 'تصميم وتطوير صفحات ويب احترافية ومتجاوبة تعمل بكفاءة على مختلف الأجهزة.',
        },
      ],
    },
    projects: {
      heading: 'أعمالي',
      button: 'عرض المشروع',
      items: [
        {
          title: 'Sales Performance Dashboard',
          technology: 'Power BI',
          description:
            'لوحة تحكم تفاعلية لتحليل أداء المبيعات باستخدام Power BI ومؤشرات الأداء الرئيسية (KPIs).',
          tags: ['Power BI', 'Data Analysis', 'KPIs', 'Dashboard'],
          image:
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
        },
        {
          title: 'Angular REST API Integration',
          technology: 'Angular',
          description:
            'ربط وتكامل تطبيق Angular مع REST API باستخدام HttpClient و RxJS مع إدارة حالات التحميل والأخطاء بكود منظم.',
          tags: ['Angular', 'REST API', 'HttpClient', 'RxJS'],
          image:
            'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
        },
        {
          title: 'Professional Landing Page',
          technology: 'HTML / CSS / Bootstrap',
          description: 'تصميم وتطوير صفحة هبوط احترافية ومتجاوبة باستخدام HTML و CSS و Bootstrap.',
          tags: ['HTML', 'CSS', 'Bootstrap', 'Responsive Design'],
          image:
            'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80',
        },
        {
          title: 'Secure Flutter Mobile App',
          technology: 'Flutter',
          description:
            'تطبيق موبايل تفاعلي باستخدام Flutter مع نظام لتشفير وتأمين البيانات الحساسة باستخدام Flutter Secure Storage.',
          tags: ['Flutter', 'Mobile', 'Security', 'Secure Storage'],
          image:
            'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=900&q=80',
        },
      ],
    },
    contact: {
      heading: 'دعنا نعمل معاً',
      description: 'هل لديك مشروع أو فكرة؟ دعنا نحولها إلى تجربة رقمية احترافية.',
      email: 'sora.ahmed.data@email.com',
      linkedin: 'https://linkedin.com/in/sora-ahmed',
      form: {
        name: 'الاسم',
        email: 'البريد الإلكتروني',
        subject: 'الموضوع',
        message: 'الرسالة',
        submit: 'إرسال الرسالة',
        success: 'تم التحقق بنجاح. يمكنك الآن ربط هذا النموذج بخدمة بريد حقيقية لاحقاً.',
        errors: {
          name: 'يرجى إدخال الاسم.',
          email: 'يرجى إدخال بريد إلكتروني صحيح.',
          subject: 'يرجى إدخال الموضوع.',
          message: 'يرجى إدخال رسالة لا تقل عن 10 أحرف.',
        },
      },
    },
    footer: {
      name: 'سارة أحمد',
      title: 'Data Analyst & Frontend Developer',
      copyright: '© 2026 Sara Ahmed. All Rights Reserved.',
    },
  };
  readonly enText: PortfolioContent = {
    nav: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      services: 'Services',
      projects: 'Projects',
      contact: 'Contact',
      cta: 'Contact Me',
    },
    hero: {
      eyebrow: "Hello, I'm",
      name: 'Sara Ahmed',
      title: 'Data Analyst & Frontend Developer',
      description:
        'I transform complex data into clear insights and interactive dashboards, and build modern web applications using Angular and REST APIs.',
      buttonPrimary: 'View My Work',
      buttonSecondary: 'Contact Me',
      stats: [
        { value: '4+', label: 'Projects' },
        { value: 'Frontend', label: 'Development' },
        { value: 'Data', label: 'Analysis' },
        { value: 'Modern', label: 'Web Solutions' },
      ],
    },
    about: {
      heading: 'About Me',
      text: 'I specialize in transforming complex data into clear interactive dashboards and developing modern web applications with Angular and REST APIs through clean, professional code.',
      highlights: [
        'Data Analysis',
        'Frontend Development',
        'Angular',
        'REST API',
        'Interactive Dashboards',
      ],
      cards: [
        { value: '4+', label: 'Projects' },
        { value: 'Frontend', label: 'Development' },
        { value: 'Data', label: 'Analysis' },
        { value: 'Modern', label: 'Web Solutions' },
      ],
    },
    skills: {
      heading: 'Skills',
      description:
        'I design and build digital experiences that combine data storytelling with technical execution.',
      groups: [
        { title: 'Frontend', items: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Angular', 'RxJS'] },
        {
          title: 'Data',
          items: ['Power BI', 'Data Analysis', 'KPI Dashboards', 'Data Visualization'],
        },
        { title: 'Backend / API', items: ['REST API', 'HttpClient', 'API Integration'] },
        { title: 'Mobile', items: ['Flutter', 'Flutter Secure Storage'] },
      ],
    },
    services: {
      heading: 'Services',
      items: [
        {
          title: 'Data Analysis & Visualization',
          description:
            'Turn raw data into concise dashboards and reports that help teams understand performance and make better decisions.',
        },
        {
          title: 'Angular Frontend Development',
          description:
            'Create modern, responsive web interfaces with Angular and maintainable, well-structured code.',
        },
        {
          title: 'REST API Integration',
          description:
            'Connect web applications to REST APIs using HttpClient and RxJS while handling loading and error states cleanly.',
        },
        {
          title: 'Responsive Web Development',
          description:
            'Design and build professional, responsive web experiences that perform smoothly across devices.',
        },
      ],
    },
    projects: {
      heading: 'Projects',
      button: 'View Project',
      items: [
        {
          title: 'Sales Performance Dashboard',
          technology: 'Power BI',
          description:
            'An interactive dashboard for analyzing sales performance using Power BI and key performance indicators (KPIs).',
          tags: ['Power BI', 'Data Analysis', 'KPIs', 'Dashboard'],
          image:
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
        },
        {
          title: 'Angular REST API Integration',
          technology: 'Angular',
          description:
            'Integrating an Angular application with a REST API using HttpClient and RxJS while managing loading and error states in a structured way.',
          tags: ['Angular', 'REST API', 'HttpClient', 'RxJS'],
          image:
            'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
        },
        {
          title: 'Professional Landing Page',
          technology: 'HTML / CSS / Bootstrap',
          description:
            'Designing and developing a professional, responsive landing page using HTML, CSS, and Bootstrap.',
          tags: ['HTML', 'CSS', 'Bootstrap', 'Responsive Design'],
          image:
            'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80',
        },
        {
          title: 'Secure Flutter Mobile App',
          technology: 'Flutter',
          description:
            'A mobile app built with Flutter with secure handling of sensitive user data using Flutter Secure Storage.',
          tags: ['Flutter', 'Mobile', 'Security', 'Secure Storage'],
          image:
            'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=900&q=80',
        },
      ],
    },
    contact: {
      heading: "Let's Work Together",
      description: 'Have a project or idea? Let’s turn it into a professional digital experience.',
      email: 'sora.ahmed.data@email.com',
      linkedin: 'https://linkedin.com/in/sora-ahmed',
      form: {
        name: 'Name',
        email: 'Email',
        subject: 'Subject',
        message: 'Message',
        submit: 'Send Message',
        success:
          'Validation passed successfully. This form is ready to be connected to a real email backend later.',
        errors: {
          name: 'Please enter your name.',
          email: 'Please provide a valid email address.',
          subject: 'Please enter a subject.',
          message: 'Please enter a message with at least 10 characters.',
        },
      },
    },
    footer: {
      name: 'Sara Ahmed',
      title: 'Data Analyst & Frontend Developer',
      copyright: '© 2026 Sara Ahmed. All Rights Reserved.',
    },
  };
  get site(): PortfolioContent {
    return this.isArabic() ? this.arText : this.enText;
  }
  get currentLanguage(): Language {
    return this.isArabic() ? 'ar' : 'en';
  }
  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 40);
  }
  toggleLanguage(): void {
    this.isArabic.update((value) => !value);
    const root = document.documentElement;
    root.lang = this.currentLanguage;
    root.dir = this.currentLanguage === 'ar' ? 'rtl' : 'ltr';
    this.closeMenu();
    queueMicrotask(() => {
      document.querySelectorAll('.reveal').forEach((element) => {
        element.classList.add('is-visible');
      });
      this.observeRevealItems();
    });
  }
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
  closeMenu(): void {
    this.menuOpen = false;
  }
  updateContactForm(event: { field: string; value: string }): void {
    const field = event.field as keyof ContactFormState;
    this.contactForm = {
      ...this.contactForm,
      [field]: event.value,
    };
  }
  openProject(project: ProjectItem): void {
    this.selectedProject = project;
    this.showProjectModal = true;
  }
  closeProjectModal(): void {
    this.showProjectModal = false;
    this.selectedProject = null;
  }
  selectedProject: ProjectItem | null = null;
  showProjectModal = false;
  submitForm(): void {
    const { name, email, subject, message } = this.contactForm;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name.trim()) {
      this.showContactError(this.site.contact.form.errors.name);
      return;
    }
    if (!emailPattern.test(email.trim())) {
      this.showContactError(this.site.contact.form.errors.email);
      return;
    }
    if (!subject.trim()) {
      this.showContactError(this.site.contact.form.errors.subject);
      return;
    }
    if (message.trim().length < 10) {
      this.showContactError(this.site.contact.form.errors.message);
      return;
    }
    this.contactSuccess = true;
    this.contactForm = { name: '', email: '', subject: '', message: '' };
  }
  showContactError(message: string): void {
    this.contactSuccess = false;
    window.alert(message);
  }
}