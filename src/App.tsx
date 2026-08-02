/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Terminal as TerminalIcon,
  Award,
  Briefcase,
  User,
  Mail,
  Linkedin,
  Phone,
  Search,
  Filter,
  ArrowUpRight,
  Cpu,
  Database,
  Grid,
  TrendingUp,
  FileText,
  MessageSquare,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  FolderCode,
  Sparkles,
  RefreshCw,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Calendar,
  Layers,
  MapPin,
  Upload,
  Image as ImageIcon,
  Globe,
  Plus,
  Link2,
  Send,
} from "lucide-react";
import {
  PERSONAL_INFO,
  PROJECTS,
  SKILLS,
  ACADEMIC_UNIASSELVI,
  ACADEMIC_UNICESUMAR,
  CERTIFICATES,
  DEFAULT_LINKS,
  Project,
  CustomLink,
  Certificate,
} from "./data";

import fotoPerfilImage from "./assets/images/foto_perfil.jpg";

// Safe Image component with high-tech CSS placeholder fallbacks matching the Elegant Dark theme
function SafeImage({
  src,
  alt,
  className,
  fallbackIcon: FallbackIcon = Award,
  ...props
}: {
  src: string;
  alt: string;
  className?: string;
  fallbackIcon?: React.ComponentType<any>;
  [key: string]: any;
}) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#0a0a0a] border border-white/10 text-slate-400 p-6 rounded-lg text-center relative overflow-hidden group min-h-[160px] ${className}`}
        id={`safe-image-placeholder-${alt.replace(/\s+/g, "-").toLowerCase()}`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-colors" />
        <FallbackIcon className="w-10 h-10 text-emerald-400/80 mb-3 animate-pulse" />
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400 mb-1">
          Visualizador de Mídia
        </span>
        <span className="text-[10px] font-mono text-slate-500 max-w-[180px] truncate block">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("inicio");
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "System v4.1.2 Initialized.",
    "Welcome to Rogério Ignacio's Professional Portfolio Terminal.",
    "Type 'ajuda' or click the buttons below to interact.",
  ]);
  const [terminalInput, setTerminalInput] = useState("");
  const [academicSystem, setAcademicSystem] = useState<
    "unicesumar" | "uniasselvi"
  >("unicesumar");
  const [certFilter, setCertFilter] = useState<string>("all");
  const [certSearch, setCertSearch] = useState<string>("");

  // Certificates dynamic state
  const [certificates, setCertificates] = useState<Certificate[]>(() => {
    try {
      const saved = localStorage.getItem("custom_cert_images");
      const parsed = saved ? JSON.parse(saved) : {};
      return CERTIFICATES.map((cert) => {
        const baseImage = cert.image;

        if (parsed[cert.id]) {
          return { ...cert, image: parsed[cert.id] };
        }
        return { ...cert, image: baseImage };
      });
    } catch (e) {
      console.error("Erro ao carregar imagens salvas:", e);
    }
    // Fallback in case of error
    return CERTIFICATES.map((cert) => ({
      ...cert,
      image: cert.image,
    }));
  });

  // Projects dynamic state with LocalStorage persistence
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem("custom_project_images");
      const parsed = saved ? JSON.parse(saved) : {};
      return PROJECTS.map((proj) => {
        const baseImage = proj.image;
        if (parsed[proj.id]) {
          return { ...proj, image: parsed[proj.id] };
        }
        return { ...proj, image: baseImage };
      });
    } catch (e) {
      console.error("Erro ao carregar imagens de projetos:", e);
    }
    return PROJECTS.map((proj) => ({
      ...proj,
      image: proj.image,
    }));
  });

  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedSite, setSelectedSite] = useState<CustomLink | null>(null);

  const projectsScrollRef = useRef<HTMLDivElement>(null);
  const certsScrollRef = useRef<HTMLDivElement>(null);
  const sitesScrollRef = useRef<HTMLDivElement>(null);
  const perfisScrollRef = useRef<HTMLDivElement>(null);

  const scrollProjects = (direction: "left" | "right") => {
    if (projectsScrollRef.current) {
      const scrollAmount = 380;
      projectsScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollCerts = (direction: "left" | "right") => {
    if (certsScrollRef.current) {
      const scrollAmount = 350;
      certsScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollSites = (direction: "left" | "right") => {
    if (sitesScrollRef.current) {
      const scrollAmount = 350;
      sitesScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollPerfis = (direction: "left" | "right") => {
    if (perfisScrollRef.current) {
      const scrollAmount = 350;
      perfisScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem("admin_authenticated") === "true";
    } catch {
      return false;
    }
  });

  const [profileImage, setProfileImage] = useState<string>(() => {
    try {
      const saved = localStorage.getItem("custom_profile_image");
      if (saved) return saved;
    } catch (e) {
      console.error("Erro ao carregar foto de perfil:", e);
    }
    return fotoPerfilImage;
  });

  // Dynamic links state (Websites & Profiles)
  const [customLinks, setCustomLinks] = useState<CustomLink[]>(() => {
    try {
      const saved = localStorage.getItem("custom_portfolio_links");
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed;
      }
    } catch (e) {
      console.error("Erro ao carregar links:", e);
    }
    return DEFAULT_LINKS;
  });

  const handleUpdateCertImage = (id: string, imageSrc: string) => {
    setCertificates((prev) => {
      const updated = prev.map((cert) => {
        if (cert.id === id) {
          const updatedCert = { ...cert, image: imageSrc };
          setSelectedCert(updatedCert);
          return updatedCert;
        }
        return cert;
      });

      try {
        const saved = localStorage.getItem("custom_cert_images");
        const currentSaved = saved ? JSON.parse(saved) : {};
        currentSaved[id] = imageSrc;
        localStorage.setItem(
          "custom_cert_images",
          JSON.stringify(currentSaved)
        );
      } catch (e) {
        console.error("Erro ao salvar imagem:", e);
      }

      return updated;
    });
  };

  const handleResetCertImage = (id: string) => {
    const original = CERTIFICATES.find((c) => c.id === id);
    if (!original) return;

    setCertificates((prev) => {
      const updated = prev.map((cert) => {
        if (cert.id === id) {
          const defaultImage = original.image;
          const updatedCert = { ...cert, image: defaultImage };
          setSelectedCert(updatedCert);
          return updatedCert;
        }
        return cert;
      });

      try {
        const saved = localStorage.getItem("custom_cert_images");
        if (saved) {
          const currentSaved = JSON.parse(saved);
          delete currentSaved[id];
          localStorage.setItem(
            "custom_cert_images",
            JSON.stringify(currentSaved)
          );
        }
      } catch (e) {
        console.error("Erro ao resetar imagem:", e);
      }

      return updated;
    });
  };

  const handleUpdateProjectImage = (id: string, imageSrc: string) => {
    setProjects((prev) => {
      const updated = prev.map((proj) => {
        if (proj.id === id) {
          const updatedProj = { ...proj, image: imageSrc };
          setSelectedProject(updatedProj);
          return updatedProj;
        }
        return proj;
      });

      try {
        const saved = localStorage.getItem("custom_project_images");
        const currentSaved = saved ? JSON.parse(saved) : {};
        currentSaved[id] = imageSrc;
        localStorage.setItem(
          "custom_project_images",
          JSON.stringify(currentSaved)
        );
      } catch (e) {
        console.error("Erro ao salvar imagem de projeto:", e);
      }

      return updated;
    });
  };

  const handleResetProjectImage = (id: string) => {
    const original = PROJECTS.find((p) => p.id === id);
    if (!original) return;

    setProjects((prev) => {
      const updated = prev.map((proj) => {
        if (proj.id === id) {
          const defaultImage = original.image;
          const updatedProj = { ...proj, image: defaultImage };
          setSelectedProject(updatedProj);
          return updatedProj;
        }
        return proj;
      });

      try {
        const saved = localStorage.getItem("custom_project_images");
        if (saved) {
          const currentSaved = JSON.parse(saved);
          delete currentSaved[id];
          localStorage.setItem(
            "custom_project_images",
            JSON.stringify(currentSaved)
          );
        }
      } catch (e) {
        console.error("Erro ao resetar imagem de projeto:", e);
      }

      return updated;
    });
  };

  // Form states
  const [formNome, setFormNome] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMensagem, setFormMensagem] = useState("");
  const [formSent, setFormSent] = useState(false);
  const [isAddingLink, setIsAddingLink] = useState(false);

  // Terminal screen element reference
  const terminalScreenRef = useRef<HTMLDivElement>(null);

  // Real-time clock and weather state
  const [timeStr, setTimeStr] = useState("");
  const [weatherData, setWeatherData] = useState<{
    temp: number | null;
    city: string | null;
    state: string | null;
    weatherCode: number | null;
    loading: boolean;
  }>({
    temp: null,
    city: null,
    state: null,
    weatherCode: null,
    loading: true,
  });

  const getWeatherIcon = (code: number | null) => {
    if (code === null) return "🌡️";
    if (code === 0) return "☀️";
    if (code >= 1 && code <= 3) return "⛅";
    if (code >= 45 && code <= 48) return "🌫️";
    if (code >= 51 && code <= 55) return "🌧️";
    if (code >= 61 && code <= 65) return "🌧️";
    if (code >= 71 && code <= 77) return "❄️";
    if (code >= 80 && code <= 82) return "🌦️";
    if (code >= 95 && code <= 99) return "⚡";
    return "🌡️";
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted =
        now.toLocaleDateString("pt-BR") + " " + now.toLocaleTimeString("pt-BR");
      setTimeStr(formatted);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const geoRes = await fetch("https://ipapi.co/json/");
        if (!geoRes.ok) throw new Error("Falha ao obter geolocalização");
        const geoData = await geoRes.json();

        const lat = geoData.latitude;
        const lon = geoData.longitude;
        const city = geoData.city || "Sua Cidade";
        const region = geoData.region_code || geoData.region || "";

        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
        );
        if (!weatherRes.ok) throw new Error("Falha ao obter clima");
        const weatherObj = await weatherRes.json();

        setWeatherData({
          temp: Math.round(weatherObj.current_weather.temperature),
          city: city,
          state: region,
          weatherCode: weatherObj.current_weather.weathercode,
          loading: false,
        });
      } catch (err) {
        console.error("Erro ao carregar clima/geolocalização: ", err);
        try {
          const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=-23.5505&longitude=-46.6333&current_weather=true`
          );
          if (weatherRes.ok) {
            const weatherObj = await weatherRes.json();
            setWeatherData({
              temp: Math.round(weatherObj.current_weather.temperature),
              city: "São Paulo",
              state: "SP",
              weatherCode: weatherObj.current_weather.weathercode,
              loading: false,
            });
            return;
          }
        } catch (fallbackErr) {
          console.error("Fallback do clima também falhou:", fallbackErr);
        }
        setWeatherData((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchWeather();
    const weatherInterval = setInterval(fetchWeather, 600000); // refresh every 10 min
    return () => clearInterval(weatherInterval);
  }, []);

  useEffect(() => {
    const terminal = terminalScreenRef.current;
    if (!terminal) return;

    // O setTimeout garante que a rolagem ocorra após o DOM ser atualizado.
    // Isso é crucial para que o React tenha tempo de renderizar o novo conteúdo
    // do terminal antes que a rolagem seja calculada e aplicada.
    setTimeout(() => {
      const commands = terminal.querySelectorAll(".terminal-command");
      if (commands.length > 0) {
        const lastCommand = commands[commands.length - 1] as HTMLElement;
        // Usar scrollTop em vez de scrollIntoView para evitar a rolagem da página principal.
        // Calcula a posição de rolagem para que o último comando digitado
        // fique visível no topo da área de exibição do terminal.
        // Subtraímos 16px para compensar o padding superior (p-4 = 1rem = 16px)
        // do container do terminal, garantindo que o comando não fique "cortado".
        terminal.scrollTo({
          top: lastCommand.offsetTop - 16, // Subtrai o padding (p-4 = 1rem = 16px)
          behavior: "smooth",
        });
      } else {
        // Fallback para o caso de não haver comandos (ex: ao limpar)
        terminal.scrollTo({ top: terminal.scrollHeight, behavior: "smooth" });
      }
    }, 0); // Executa na próxima "tick" do event loop.
  }, [terminalHistory]);

  /**
   * Processa um comando digitado no terminal, atualizando o histórico de comandos
   * e exibindo a resposta correspondente.
   * @param cmd O comando bruto digitado pelo usuário.
   */
  const handleTerminalCommand = (cmd: string) => {
    // Normaliza o comando para facilitar a comparação (remove espaços e converte para minúsculas).
    const cleanCmd = cmd.trim().toLowerCase();
    let response: string[] = []; // Array para armazenar as linhas de resposta do comando.

    switch (cleanCmd) {
      case "ajuda":
        response = [
          ">_ Comandos Disponíveis:",
          "  sobre     - Exibir histórico pessoal e biografia",
          "  formacao  - Listar principais médias e progresso acadêmico",
          "  projetos  - Exibir soluções tecnológicas inovadoras (VITA, Músculos, etc)",
          "  contato   - Mostrar canais diretos e formulário de contato",
          "  limpar    - Limpar o console",
          "  data      - Exibir relógio de sistema em tempo real e clima local",
        ];
        break;
      case "sobre":
        // Exibe informações pessoais detalhadas, incluindo biografia.
        response = [
          `>_ ${PERSONAL_INFO.name}`,
          `Idade: ${PERSONAL_INFO.age} anos | Localização: ${PERSONAL_INFO.location}`,
          `Status: ${PERSONAL_INFO.status}`,
          "---",
          "Meu nome é Rogério Ignacio Barbosa, tenho 38 anos e uma história marcada por curiosidade, criatividade e resiliência. Desde criança, sempre fui fascinado por tecnologia. Desmontava brinquedos para entender como funcionavam e, quando quebravam, eu mesmo tentava consertá-los. Esse espírito inquieto me acompanha até hoje.",
          "Minha jornada educacional começou em 1994, no Colégio Estadual Santo Antônio de Pádua, onde concluí o segundo grau em 2005. Durante esse período, mergulhei em cursos que expandiram minha visão: Informática Básica – Faetec, Linux – Ong Cisane, Fotografia, Edição e Operação de Áudio – Ong Cisane e CUFA",
          "Na mesma ONG, atuei como Oficineiro de Grafite, Aerografia e Desenho Artístico, explorando estilos como anga, realismo, pontilhismo e aquarela",
          "Participei de projetos sociais como Cinema para Todos (LIGHT) e CDI – Centro de Democratização da Internet, levando cultura e tecnologia para comunidades carentes. Produzi dois curtas-metragens pela Ong Cisane: Influenciado – vencedor do Teia Nacional no Piauí e Uma Era Nova Para Nova Era",
          "Minha experiência profissional formal (CLT) passou por áreas como logística, estoque, atendimento, serviços gerais e assistência técnica. Mesmo atuando em funções diversas, nunca deixei de estudar tecnologia por conta própria. Assistia aulas no YouTube, testava códigos e até criei um assistente virtual inspirado no Jarvis, não igual ao do filme, mas funcional dentro das minhas possibilidades.",
          "Sempre fui movido por ideias. Desenvolvi projetos como: Prótese robótica, Patins de alta velocidade, Cão robô, Músculo artificial feito de nylon",
          "Muitos diziam que eram ideias malucas, e isso me desmotivava. Alguns desses projetos foram lançados por outras pessoas depois, o que me fez perceber que eu estava no caminho certo, só faltava apoio.",
          "Trabalhei como freelancer em fotografia e filmagens. Também como marceneiro artesão, criando móveis com madeira reciclada. Mas com a pandemia do Corona Vírus, precisei vender meus equipamentos. O nascimento do meu filho foi um divisor de águas: percebi que havia deixado os estudos de lado por tempo demais. Decidi retomar minha formação e escolhi Engenharia de Software como área de atuação.",
          "Em 2024, fiquei afastado do trabalho por sete meses. Minha coluna travou, perdi força nos braços e tive o pedido negado pelo INSS três vezes. Mesmo assim, lutei, fiz fisioterapia, comprei medicamentos e retornei ao trabalho. Com a saúde recuperada, voltei à faculdade e pedi transferência para a Unicesumar em 2025.",
          "Se você chegou até aqui, agradeço pela paciência em conhecer um pouco da minha trajetória. Este portfólio foi inteiramente criado e estruturado por mim, com dedicação e autenticidade. Minha história ainda está sendo escrita, e cada linha é movida por paixão, superação e vontade de transformar ideias em realidade.",
        ];
        break;
      case "formacao":
        // Exibe detalhes sobre a formação acadêmica.
        response = [
          ">_ Formação Acadêmica em Destaque:",
          "  * UNICESUMAR (Engenharia de Software) - Em andamento. Destaque em Análise de Objetos (Nota 9.0) e Estrutura de Dados (Nota 8.7).",
          "  * UNIASSELVI - Destaque em Banco de Dados Relacional (Nota 10.0), Estatística (Nota 9.45), Liderança (Nota 9.05) e OOP (Nota 8.70).",
        ];
        break;
      case "projetos":
        // Lista projetos científicos e de engenharia.
        response = [
          ">_ Projetos Científicos e Engenharia:",
          "  1. VITA: Drone inteligente autônomo com IA conversacional e reconhecimento de imagem para resgates.",
          "  2. Músculo de Nylon: Atuadores biomiméticos térmicos de alta tração e baixíssimo custo.",
        ];
        break;
      case "contato":
        // Fornece informações de contato.
        response = [
          ">_ Canais Disponíveis:",
          `  Email:    ${PERSONAL_INFO.email}`,
          `  WhatsApp: ${PERSONAL_INFO.phone}`,
          `  LinkedIn: linkedin.com/in/rogerio-ignacio-barbosa-512a34103`,
        ];
        break;
      case "limpar":
        // Limpa todo o histórico do terminal.
        setTerminalHistory([]);
        return; // Retorna para não adicionar o comando 'limpar' ao histórico.
      case "data":
        // Exibe a data/hora atual e informações climáticas.
        response = [
          `>_ Data/Hora Local: ${new Date().toLocaleDateString(
            "pt-BR"
          )} ${new Date().toLocaleTimeString("pt-BR")}`,
          `>_ UTC Server Time: ${new Date().toUTCString()}`,
          weatherData.city
            ? `>_ Clima Local (${weatherData.city}${
                weatherData.state ? `, ${weatherData.state}` : ""
              }): ${weatherData.temp}°C | Status: Ativo`
            : `>_ Clima Local: Não foi possível obter localização`,
        ];
        break;
      default:
        // Mensagem padrão para comandos não reconhecidos.
        response = [
          `Comando '${cmd}' não reconhecido. Digite 'ajuda' para listar os comandos.`,
        ];
        break;
    }

    // Adiciona o comando digitado e sua resposta ao histórico do terminal.
    setTerminalHistory((prev) => [
      ...prev,
      `rogerio@system:~$ ${cmd}`, // O comando digitado pelo usuário.
      ...response,
    ]);
    setTerminalInput(""); // Limpa o campo de entrada do terminal.
  };
  const [editingLinkId, setEditingLinkId] = useState<string | null>(null);

  // Safe email sender
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formNome || !formEmail || !formMensagem) return;

    // Build the mailto link
    const subject = encodeURIComponent(`Contato Portfólio - ${formNome}`);
    const body = encodeURIComponent(
      `${formMensagem}\n\nContato de retorno: ${formEmail}`
    );
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;

    setFormSent(true);
    setTimeout(() => setFormSent(false), 5000);
  };

  const [linkFormType, setLinkFormType] = useState<"site" | "perfil">("site");
  const [linkFormTitle, setLinkFormTitle] = useState("");
  const [linkFormUrl, setLinkFormUrl] = useState("");
  const [linkFormDesc, setLinkFormDesc] = useState("");
  const [linkFormPlatform, setLinkFormPlatform] = useState("LinkedIn");
  const [linkFormImage, setLinkFormImage] = useState("");

  const resetLinkForm = () => {
    setIsAddingLink(false);
    setEditingLinkId(null);
    setLinkFormType("site");
    setLinkFormTitle("");
    setLinkFormUrl("");
    setLinkFormDesc("");
    setLinkFormPlatform("LinkedIn");
    setLinkFormImage("");
  };

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    const newLink: CustomLink = {
      id: `custom-${Date.now()}`,
      type: linkFormType,
      title: linkFormTitle,
      url: linkFormUrl,
      description: linkFormDesc,
      platform: linkFormType === "perfil" ? linkFormPlatform : undefined,
      image: linkFormImage || undefined,
    };
    const updatedLinks = [...customLinks, newLink];
    setCustomLinks(updatedLinks);
    localStorage.setItem("custom_portfolio_links", JSON.stringify(updatedLinks));
    resetLinkForm();
  };

  const handleEditLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLinkId) return;

    const updatedLinks = customLinks.map((link) => {
      if (link.id === editingLinkId) {
        return {
          ...link,
          type: linkFormType,
          title: linkFormTitle,
          url: linkFormUrl,
          description: linkFormDesc,
          platform: linkFormType === "perfil" ? linkFormPlatform : undefined,
          image: linkFormImage || undefined,
        };
      }
      return link;
    });

    setCustomLinks(updatedLinks);
    localStorage.setItem("custom_portfolio_links", JSON.stringify(updatedLinks));
    resetLinkForm();
  };

  // Filtering Certificates
  const filteredCertificates = certificates.filter((cert) => {
    const matchesFilter = certFilter === "all" || cert.category === certFilter;
    const matchesSearch =
      cert.title.toLowerCase().includes(certSearch.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(certSearch.toLowerCase()) ||
      cert.summary.toLowerCase().includes(certSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div
      className="min-h-screen bg-[#050505] text-slate-100 font-sans selection:bg-emerald-500 selection:text-black relative tech-grid-bg overflow-x-clip"
      id="app-root"
    >
      {/* Visual background glows - Pure Elegant Dark Emerald palette */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-[30%] right-10 w-[600px] h-[600px] bg-emerald-500/3 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-emerald-500/2 rounded-full blur-3xl pointer-events-none" />

      {/* Elegant Dark HUD Topbar */}
      <header
        className="sticky top-0 z-40 bg-[#050505]/85 backdrop-blur-md border-b border-white/10"
        id="app-header"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-500 rounded-sm rotate-45 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <div className="w-4 h-4 bg-[#050505] rounded-sm flex items-center justify-center -rotate-45">
                <span className="font-mono font-bold text-[10px] text-emerald-400">
                  R
                </span>
              </div>
            </div>
            <div>
              <span className="font-mono font-bold text-base tracking-tighter text-white block">
                SYSTEM.ROGERIO
              </span>
              <span className="text-[9px] font-mono text-emerald-500 uppercase tracking-widest block -mt-1.5">
                [ SOFTWARE & INOVAÇÃO ]
              </span>
            </div>
          </div>

          {/* Elegant Dark Navigation with '//' monospaced prefix */}
          <nav
            className="hidden md:flex items-center gap-6 font-mono text-xs"
            id="desktop-nav"
          >
            {[
              { id: "inicio", label: "HOME" },
              { id: "sobre", label: "ABOUT" },
              { id: "projetos", label: "PROJECTS" },
              { id: "links", label: "LINKS" },
              { id: "certificados", label: "STACK" },
              { id: "contato", label: "CONTACT" },
            ].map((item) => {
              return (
                <a
                  key={item.id}
                  href="#"
                  id={`nav-link-${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab(item.id);
                    const element = document.getElementById(item.id);
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className={`transition-colors uppercase tracking-wider ${
                    activeTab === item.id
                      ? "text-emerald-400 font-bold"
                      : "text-slate-400 hover:text-emerald-400"
                  }`}
                >
                  // {item.label}
                </a>
              );
            })}
          </nav>

          {/* Clock Info Area - Elegant Dark Styled */}
          <div
            className="flex flex-col items-end text-[10px] sm:text-[11px] font-mono text-slate-400 border-l border-white/10 pl-3 sm:pl-4"
            id="hud-clock"
          >
            <span className="text-emerald-400 uppercase tracking-widest flex items-center gap-1 sm:gap-1.5 font-bold">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
              SYSTEM ACTIVE [PT-BR]
            </span>
            <div className="flex flex-col items-end gap-0.5 text-slate-500">
              <span
                className="text-[10px] text-slate-400 truncate max-w-[180px] sm:max-w-[200px]"
                title={timeStr}
              >
                {timeStr ? timeStr : "LOGGING ACTIVE..."}
              </span>
              {!weatherData.loading && weatherData.city && (
                <span
                  className="text-emerald-400/90 font-bold flex items-center gap-1 text-[9px] sm:text-[10px]"
                  title={`${weatherData.city}${
                    weatherData.state ? `, ${weatherData.state}` : ""
                  }: ${weatherData.temp}°C`}
                >
                  <span className="inline-block w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  {weatherData.city}
                  {weatherData.state ? `, ${weatherData.state}` : ""}:{" "}
                  {weatherData.temp}°C {getWeatherIcon(weatherData.weatherCode)}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* CONTINUOUS AUTO-SCROLLING CAROUSEL */}
      <section
        className="bg-[#050505] border-b border-white/10 py-4 overflow-hidden relative"
        id="carousel-section"
      >
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050505] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050505] to-transparent z-10" />
        <div className="max-w-7xl mx-auto px-4 mb-2 flex items-center justify-between text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <Sparkles className="w-3.5 h-3.5 animate-spin text-emerald-400" />
            REGISTROS RECENTES & STACK DE CONHECIMENTOS
          </span>
          <span className="text-[10px] text-slate-500">
            (15 Certificações Ativas)
          </span>
        </div>

        {/* Infinite Moving Carousel Container */}
        <div className="w-full overflow-hidden relative">
          <div className="flex gap-4 w-max animate-[scroll_50s_linear_infinite] py-1 hover:[animation-play-state:paused]">
            {[...certificates, ...certificates].map((cert, index) => (
              <div
                key={`${cert.id}-${index}`}
                onClick={() => setSelectedCert(cert)}
                className="inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/30 px-4 py-2.5 rounded-lg cursor-pointer transition-all shrink-0 hover:shadow-[0_0_15px_rgba(16,185,129,0.1)] group"
                id={`carousel-item-${cert.id}-${index}`}
              >
                <div className="w-32 h-28 rounded bg-black flex items-center justify-center overflow-hidden border border-white/10 shrink-0">
                  <SafeImage
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  />
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors max-w-[220px] truncate">
                    {cert.title}
                  </p>
                  <p className="text-[10px] font-mono text-slate-500">
                    {cert.issuer}
                  </p>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-emerald-400 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-20">
        {/* HERO SECTION - INÍCIO */}
        <section
          id="inicio"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-4"
        >
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
              STATUS: {PERSONAL_INFO.status.toUpperCase()}
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
              Transformando ideias em <br />
              <span className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500 bg-clip-text text-transparent glow-emerald">
                Engenharia de Impacto
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl border-l-2 border-emerald-500/30 pl-4">
              Me chamo{" "}
              <strong className="text-emerald-400">{PERSONAL_INFO.name}</strong>
              . Estudante de Engenharia de Software Bacharelado apaixonado por
              tecnologia. Foco na criação de protótipos de alta tecnologia de
              impacto prático, sistemas avançados de banco de dados e automações
              industriais.
            </p>

            {/* Quick Stats Grid with Custom hover and borders */}
            <div
              className="grid grid-cols-3 gap-4 py-2 max-w-lg"
              id="hero-stats-grid"
            >
              <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center hover:border-emerald-500/30 transition-all">
                <span className="block text-2xl font-display font-black text-white">
                  200+
                </span>
                <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest font-bold">
                  Horas de BD
                </span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center hover:border-emerald-500/30 transition-all">
                <span className="block text-2xl font-display font-black text-white">
                {certificates.length}
                </span>
                <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest font-bold">
                  Certificações
                </span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center hover:border-emerald-500/30 transition-all">
                <span className="block text-2xl font-display font-black text-white">
                {projects.length}
                </span>
                <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest font-bold">
                Projetos
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#"
                id="cta-explore-projects"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("projetos");
                  const element = document.getElementById("projetos");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-[#050505] font-mono font-bold rounded-lg shadow-lg hover:shadow-emerald-500/20 transition-all flex items-center gap-2"
              >
                <Briefcase className="w-4 h-4" />
                Explorar Projetos
              </a>
              <a
                href="#"
                id="cta-contact-direct"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("contato");
                  const element = document.getElementById("contato");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/50 text-slate-200 font-mono font-bold rounded-lg transition-all flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-emerald-400" />
                Entre em Contato
              </a>
            </div>
          </div>

          {/* Hero Right Media (Futuristic Avatar Frame - Emerald Dark Version) */}
          <div
            className="lg:col-span-5 flex flex-col items-center justify-center relative"
            id="hero-avatar-area"
          >
            {/* Tech frame overlay elements */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10 pointer-events-none" />

            {/* Frame corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-emerald-400 z-10" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-emerald-400 z-10" />
            <div className="absolute bottom-16 left-0 w-8 h-8 border-b-2 border-l-2 border-emerald-400 z-10" />
            <div className="absolute bottom-16 right-0 w-8 h-8 border-b-2 border-r-2 border-emerald-400 z-10" />

            {/* Spinning radar lines */}
            <div className="absolute -inset-4 border border-dashed border-emerald-500/10 rounded-full animate-[spin_40s_linear_infinite] pointer-events-none" />
            <div className="absolute -inset-8 border border-emerald-500/5 rounded-full animate-[spin_20s_linear_infinite] pointer-events-none" />

            {/* The photo container */}
            <div className="w-[300px] h-[340px] rounded-lg overflow-hidden border border-white/10 bg-black/80 p-3 relative group">
              <div className="absolute inset-0 bg-emerald-500/5 mix-blend-color group-hover:opacity-0 transition-opacity" />

              <div className="w-full h-full rounded overflow-hidden relative">
                <SafeImage
                  src={profileImage}
                  alt="Foto de Perfil de Rogério"
                  className="w-full h-full object-cover object-top scale-105 group-hover:scale-100 transition-transform duration-700"
                  fallbackIcon={User}
                />
              </div>

              {/* HUD metadata text overlay */}
              <div className="absolute bottom-5 left-5 right-5 bg-[#050505]/95 border border-emerald-500/20 rounded p-2.5 font-mono text-[10px] space-y-1 z-20 shadow-xl">
                <p className="text-emerald-400 font-bold flex items-center justify-between">
                  <span>ID_CODE:</span>
                  <span>SYS-8509</span>
                </p>
                <p className="text-slate-300">
                  NOME: {PERSONAL_INFO.name.toUpperCase()}
                </p>
                <p className="text-slate-300">CARGO: ENGENHEIRO DE SOFTWARE</p>
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                  ONLINE: SECURE_CORE
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ABOUT SECTION - SOBRE MIM */}
        <section id="sobre" className="space-y-10 scroll-mt-20">
          <div className="border-l-4 border-emerald-500 pl-4 space-y-2">
            <h2 className="font-display text-3xl font-black tracking-tight text-white uppercase">
              Sobre Minha Trajetória
            </h2>
            <p className="text-sm font-mono text-emerald-500">
              [SYSTEM_RECORDS: BIOGRAFIA, CURRÍCULO E ACADEMIA]
            </p>
          </div>

          {/* Two separate high-fidelity screens for Trajectory */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* CARD 1: REGISTROS PROFISSIONAIS (TERMINAL) */}
            <div
              className="lg:col-span-7 border border-white/10 bg-black/40 backdrop-blur-md rounded-xl p-5 sm:p-6 shadow-[inset_0_0_30px_rgba(16,185,129,0.03)] flex flex-col h-[520px] justify-between relative overflow-hidden"
              id="professional-terminal-panel"
            >
              {/* HUD Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-3 font-mono uppercase tracking-widest text-slate-500 flex-shrink-0">
                <div className="flex items-center gap-2 text-emerald-400">
                  <div className="flex gap-1">
                    <div className="w-2.5 h-2.5 bg-red-500 rounded-full opacity-80" />
                    <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full opacity-80" />
                    <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full opacity-80" />
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold text-white tracking-wide ml-1.5">
                    SOBRE MIM
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 font-bold flex items-center gap-1">
                  {!weatherData.loading && weatherData.city ? (
                    <>
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                      {weatherData.city}
                      {weatherData.state ? `, ${weatherData.state}` : ""} (
                      {weatherData.temp}°C)
                    </>
                  ) : (
                    "CONEXÃO ATIVA"
                  )}
                </span>
              </div>

              {/* Terminal Screen - Scrollable container */}
              <div
                ref={terminalScreenRef}
                className="flex-1 overflow-y-auto pr-2 space-y-3 bg-black/60 border border-white/10 rounded-lg p-4 font-mono text-xs text-slate-300"
                id="terminal-screen-container"
              >
                {terminalHistory.map((line, idx) => (
                  <p
                    key={idx}
                    className={`whitespace-pre-wrap break-words leading-relaxed ${
                      line.startsWith("rogerio@system")
                        ? "terminal-command"
                        : ""
                    } ${
                      line.startsWith("rogerio@system")
                        ? "text-emerald-400 font-bold"
                        : line.startsWith(">_")
                        ? "text-yellow-400 font-semibold"
                        : line.includes("Comando")
                        ? "text-red-400"
                        : "text-slate-300"
                    }`}
                  >
                    {line}
                  </p>
                ))}
              </div>

              {/* Interactive buttons & footer */}
              <div className="mt-3 flex-shrink-0 space-y-3">
                <div className="flex flex-wrap gap-2" id="terminal-prompts">
                  <button
                    onClick={() => handleTerminalCommand("sobre")}
                    className="px-3 py-1.5 bg-white/5 hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/20 rounded font-mono text-[10px] text-emerald-400 transition-colors cursor-pointer"
                  >
                    cat bio.sh
                  </button>
                  <button
                    onClick={() => handleTerminalCommand("formacao")}
                    className="px-3 py-1.5 bg-white/5 hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/20 rounded font-mono text-[10px] text-emerald-400 transition-colors cursor-pointer"
                  >
                    cat formacao.log
                  </button>
                  <button
                    onClick={() => handleTerminalCommand("projetos")}
                    className="px-3 py-1.5 bg-white/5 hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/20 rounded font-mono text-[10px] text-emerald-400 transition-colors cursor-pointer"
                  >
                    cat patentes.txt
                  </button>
                  <button
                    onClick={() => handleTerminalCommand("contato")}
                    className="px-3 py-1.5 bg-white/5 hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/20 rounded font-mono text-[10px] text-emerald-400 transition-colors cursor-pointer"
                  >
                    cat contatos.env
                  </button>
                  <button
                    onClick={() => handleTerminalCommand("limpar")}
                    className="px-3 py-1.5 bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/20 rounded font-mono text-[10px] text-red-400 transition-colors cursor-pointer"
                  >
                    clear
                  </button>
                </div>
                <div className="flex items-center justify-between text-[9px] font-mono text-slate-600 border-t border-white/5 pt-2">
                  <span>[INTERACTIVE TERMINAL]</span>
                  <span>ROLE PARA VER MAIS HISTÓRICO ▼</span>
                </div>
              </div>
            </div>

            {/* CARD 2: HISTÓRICO ACADÊMICO (GRADES) */}
            <div
              className="lg:col-span-5 border border-white/10 bg-black/40 backdrop-blur-md rounded-xl p-5 sm:p-6 shadow-[inset_0_0_30px_rgba(16,185,129,0.03)] flex flex-col h-[520px] justify-between relative overflow-hidden"
              id="academic-grades-panel"
            >
              {/* HUD Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-3 font-mono uppercase tracking-widest text-slate-500 flex-shrink-0">
                <div className="flex items-center gap-2 text-emerald-400">
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs sm:text-sm font-extrabold text-white tracking-wide">
                    HISTÓRICO ACADÊMICO
                  </span>
                </div>
                {/* Academic Selector tabs */}
                <div className="flex bg-black/60 p-0.5 rounded border border-white/10 font-mono">
                  <button
                    onClick={() => setAcademicSystem("unicesumar")}
                    className={`px-2 py-0.5 text-[9px] rounded transition-colors cursor-pointer ${
                      academicSystem === "unicesumar"
                        ? "bg-emerald-500 text-[#050505] font-bold"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Unicesumar
                  </button>
                  <button
                    onClick={() => setAcademicSystem("uniasselvi")}
                    className={`px-2 py-0.5 text-[9px] rounded transition-colors cursor-pointer ${
                      academicSystem === "uniasselvi"
                        ? "bg-emerald-500 text-[#050505] font-bold"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Uniasselvi
                  </button>
                </div>
              </div>

              {/* Scrollable list content */}
              <div
                className="flex-1 overflow-y-auto pr-2 space-y-2.5"
                id="modules-list-container"
              >
                <div className="bg-white/5 border border-white/10 rounded p-3 mb-2 font-mono text-[10px] text-slate-400 leading-relaxed">
                  Desempenho acadêmico oficial detalhado por disciplina nas
                  instituições de ensino superior.
                </div>
                {(academicSystem === "unicesumar"
                  ? ACADEMIC_UNICESUMAR
                  : ACADEMIC_UNIASSELVI
                ).map((module, idx) => {
                  const isPassedHigh =
                    module.grade !== "Em Andamento" &&
                    parseFloat(module.grade) >= 8.5;
                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/10 rounded transition-colors text-xs"
                    >
                      <div className="space-y-0.5 max-w-[200px] sm:max-w-[240px]">
                        <span className="font-semibold text-slate-200 line-clamp-1">
                          {module.name}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 block">
                          {module.period}
                        </span>
                      </div>
                      <span
                        className={`font-mono font-bold px-2 py-0.5 rounded text-[11px] ${
                          module.grade === "Em Andamento"
                            ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                            : isPassedHigh
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        }`}
                      >
                        {module.grade}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Fixed bottom stats */}
              <div className="mt-3 flex-shrink-0 space-y-2">
                <div className="bg-black/60 rounded p-3 border border-white/10 text-[10px] font-mono text-slate-400 flex items-center justify-between">
                  <span>CR_MÉDIO:</span>
                  <span className="text-emerald-400 font-bold">
                    {academicSystem === "unicesumar"
                      ? "8.32 / 10.0"
                      : "8.25 / 10.0"}
                  </span>
                  <span>STATUS:</span>
                  <span className="text-emerald-400 font-bold uppercase">
                    Aprovado
                  </span>
                </div>
                <div className="flex items-center justify-between text-[9px] font-mono text-slate-600 border-t border-white/5 pt-2">
                  <span>[SISTEMA ACADÊMICO]</span>
                  <span>ROLE PARA VER DISCIPLINAS ▼</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS MATRIX SECTION */}
        <section className="space-y-8" id="habilidades">
          <div className="border-l-4 border-emerald-500 pl-4 space-y-2">
            <h2 className="font-display text-3xl font-black tracking-tight text-white uppercase">
              Matriz de Habilidades
            </h2>
            <p className="text-sm font-mono text-emerald-500">
              [CONHECIMENTOS TÉCNICOS E COMPETÊNCIAS PROFISSIONAIS]
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Desenvolvimento Front-End",
                category: "frontend",
                icon: Grid,
                colorClass: "text-emerald-400",
              },
              {
                title: "Sistemas & Banco de Dados",
                category: "backend",
                icon: Database,
                colorClass: "text-emerald-400",
              },
              {
                title: "Soluções de Nuvem & MVP",
                category: "cloud",
                icon: Cpu,
                colorClass: "text-emerald-400",
              },
              {
                title: "Liderança & Gestão",
                category: "leadership",
                icon: TrendingUp,
                colorClass: "text-emerald-400",
              },
              {
                title: "Logística & Suprimentos",
                category: "logistics",
                icon: Layers,
                colorClass: "text-emerald-400",
              },
              {
                title: "Mídia & Criação Artística",
                category: "creative",
                icon: Sparkles,
                colorClass: "text-emerald-400",
              },
            ].map((section) => {
              const Icon = section.icon;
              const sectionSkills = SKILLS.filter(
                (s) => s.category === section.category
              );
              return (
                <div
                  key={section.category}
                  className="bg-white/5 border border-white/10 rounded-lg p-5 hover:border-emerald-500/30 transition-all flex flex-col justify-between group hover:shadow-[0_4px_20px_rgba(16,185,129,0.05)]"
                  id={`skill-card-${section.category}`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-2.5 pb-3 border-b border-white/5">
                      <div
                        className={`p-2 bg-black rounded ${section.colorClass}`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-display font-bold text-sm text-white">
                        {section.title}
                      </h3>
                    </div>

                    <div className="space-y-2">
                      {sectionSkills.map((skill, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex items-center justify-between text-xs font-mono">
                            <span className="text-slate-300 font-semibold">
                              {skill.name}
                            </span>
                            <span className="text-slate-500 text-[10px]">
                              {skill.level}
                            </span>
                          </div>
                          <div className="w-full bg-black rounded-full h-1">
                            <div
                              className="h-1 rounded-full bg-emerald-500"
                              style={{
                                width:
                                  skill.level === "Avançado"
                                    ? "100%"
                                    : skill.level === "Intermediário"
                                    ? "75%"
                                    : "40%",
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* PROJECTS SECTION - PROJETOS */}
        <section id="projetos" className="space-y-10 scroll-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4 border-emerald-500 pl-4">
            <div className="space-y-1">
              <h2 className="font-display text-3xl font-black tracking-tight text-white uppercase">
                Projetos & Invenções
              </h2>
              <p className="text-sm font-mono text-emerald-500">
                [PATENTES IDEAIS, PROTOTIPAGEM ATIVA E PESQUISA APLICADA]
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-[10px] px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 font-mono font-bold">
                {projects.length} PROJETOS
              </span>
            </div>
          </div>

          <div className="relative group/arrows">
            {/* Left navigation arrow */}
            <button
              onClick={() => scrollProjects("left")}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-2.5 rounded-full bg-black/80 hover:bg-emerald-500/20 text-emerald-400 border border-white/10 hover:border-emerald-500/30 transition-all shadow-lg shadow-black/50 cursor-pointer flex items-center justify-center group active:scale-95"
              aria-label="Projetos anteriores"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>

            {/* Right navigation arrow */}
            <button
              onClick={() => scrollProjects("right")}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-2.5 rounded-full bg-black/80 hover:bg-emerald-500/20 text-emerald-400 border border-white/10 hover:border-emerald-500/30 transition-all shadow-lg shadow-black/50 cursor-pointer flex items-center justify-center group active:scale-95"
              aria-label="Próximos projetos"
            >
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Horizontal Scroll Container */}
            <div
              ref={projectsScrollRef}
              className="flex overflow-x-auto gap-6 pb-6 pt-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              id="projects-horizontal-scroll"
            >
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="w-[320px] sm:w-[480px] shrink-0 snap-center bg-white/5 border border-white/10 rounded-lg overflow-hidden flex flex-col justify-between group hover:border-emerald-500/20 hover:shadow-[0_4px_30px_rgba(16,185,129,0.05)] transition-all"
                  id={`project-card-${project.id}`}
                >
                  <div>
                    {/* Photo area */}
                    <div className="h-64 overflow-hidden relative bg-black border-b border-white/10">
                      <div className="absolute top-3 left-3 bg-[#050505]/90 border border-emerald-500/20 font-mono text-[9px] text-emerald-400 uppercase tracking-widest px-2.5 py-1 rounded z-10">
                        {project.status}
                      </div>
                      <SafeImage
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        fallbackIcon={Cpu}
                      />
                    </div>

                    {/* Details Area */}
                    <div className="p-6 space-y-4">
                      <h3 className="font-display font-bold text-xl text-white group-hover:text-emerald-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-[11px] font-mono text-emerald-400 tracking-wide uppercase">
                        {project.tagline}
                      </p>
                      <p className="text-xs text-slate-400 line-clamp-3">
                        {project.summary}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="w-full py-2.5 bg-black hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/30 text-xs font-mono font-bold text-emerald-400 tracking-wider uppercase rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      Análise de Sistema{" "}
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Scroll indicators and metadata */}
            <div className="flex items-center justify-between text-[9px] font-mono text-slate-600 mt-2 border-t border-white/5 pt-2 flex-shrink-0">
              <span>[NÚCLEO DE PROSPECÇÃO]</span>
              <span>DESLIZE PARA OS LADOS PARA VER MAIS ◄ ►</span>
            </div>
          </div>
        </section>

        {/* WEBSITES & PROFILES SECTION - SITES E PERFIS */}
        <section id="links" className="space-y-10 scroll-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4 border-emerald-500 pl-4">
            <div className="space-y-1">
              <h2 className="font-display text-3xl font-black tracking-tight text-white uppercase">
                Sites & Perfis Divulgados
              </h2>
              <p className="text-sm font-mono text-emerald-500">
                [PORTFÓLIO DE PROJETOS WEB E PRESENÇA DIGITAL]
              </p>
            </div>
          </div>

          {/* ADD/EDIT LINK FORM INLINE COLLAPSIBLE */}
          <AnimatePresence>
            {isAddingLink && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <form
                  onSubmit={editingLinkId ? handleEditLink : handleAddLink}
                  className="bg-white/5 border border-emerald-500/30 rounded-lg p-5 space-y-4 font-mono text-xs text-slate-300"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-[11px] text-emerald-400 tracking-widest uppercase font-bold flex items-center gap-1.5">
                      <TerminalIcon className="w-3.5 h-3.5 animate-pulse" />
                      {editingLinkId
                        ? "Editar Link Registrado"
                        : "Registrar Novo Link de Divulgação"}
                    </span>
                    <button
                      type="button"
                      onClick={resetLinkForm}
                      className="text-slate-500 hover:text-white transition-colors uppercase text-[10px]"
                    >
                      Cancelar
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-slate-400 uppercase">
                        Tipo de Link *
                      </label>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setLinkFormType("site")}
                          className={`flex-1 py-2 text-center rounded border transition-all cursor-pointer text-[11px] font-bold ${
                            linkFormType === "site"
                              ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold"
                              : "bg-black border-white/10 text-slate-400 hover:text-white"
                          }`}
                        >
                          Website Construído
                        </button>
                        <button
                          type="button"
                          onClick={() => setLinkFormType("perfil")}
                          className={`flex-1 py-2 text-center rounded border transition-all cursor-pointer text-[11px] font-bold ${
                            linkFormType === "perfil"
                              ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold"
                              : "bg-black border-white/10 text-slate-400 hover:text-white"
                          }`}
                        >
                          Perfil Profissional
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] text-slate-400 uppercase">
                        Título do Link *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={
                          linkFormType === "site"
                            ? "Ex: VITA Drone Dashboard"
                            : "Ex: Perfil do LinkedIn"
                        }
                        value={linkFormTitle}
                        onChange={(e) => setLinkFormTitle(e.target.value)}
                        className="w-full bg-black border border-white/10 focus:border-emerald-500 rounded p-2.5 text-xs text-slate-200 placeholder-slate-700 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-slate-400 uppercase">
                        Endereço Web (URL) *
                      </label>
                      <div className="relative">
                        <Link2 className="w-4 h-4 text-slate-600 absolute left-3 top-3" />
                        <input
                          type="text"
                          required
                          placeholder="https://exemplo.com.br"
                          value={linkFormUrl}
                          onChange={(e) => setLinkFormUrl(e.target.value)}
                          className="w-full pl-9 pr-4 py-2.5 bg-black border border-white/10 focus:border-emerald-500 rounded text-xs text-slate-200 placeholder-slate-700 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {linkFormType === "perfil" ? (
                      <div className="space-y-1.5">
                        <label className="text-[10px] text-slate-400 uppercase">
                          Plataforma
                        </label>
                        <select
                          value={linkFormPlatform}
                          onChange={(e) => setLinkFormPlatform(e.target.value)}
                          className="w-full bg-black border border-white/10 focus:border-emerald-500 rounded p-2.5 text-xs text-slate-300 focus:outline-none transition-colors cursor-pointer"
                        >
                          <option value="LinkedIn">LinkedIn</option>
                          <option value="GitHub">GitHub</option>
                          <option value="WhatsApp">WhatsApp</option>
                          <option value="YouTube">YouTube</option>
                          <option value="Medium">Medium / Blog</option>
                          <option value="Instagram">Instagram</option>
                          <option value="Outro">Outros / Portfólios</option>
                        </select>
                      </div>
                    ) : (
                      <div className="space-y-1.5">
                        <label className="text-[10px] text-slate-400 uppercase">
                          Tags do Site
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: React, Tailwind, API"
                          className="w-full bg-black border border-white/10 focus:border-emerald-500 rounded p-2.5 text-xs text-slate-200 placeholder-slate-700 focus:outline-none transition-colors"
                          disabled // This field seems decorative, keeping it disabled.
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-400 uppercase">
                      Descrição Curta *
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Fale brevemente sobre o site ou sobre o que divulga neste perfil..."
                      value={linkFormDesc}
                      onChange={(e) => setLinkFormDesc(e.target.value)}
                      className="w-full bg-black border border-white/10 focus:border-emerald-500 rounded p-2.5 text-xs text-slate-200 placeholder-slate-700 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 col-span-1">
                      <label className="text-[10px] text-slate-400 uppercase">
                        Imagem do Link (URL - Opcional)
                      </label>
                      <input
                        type="text"
                        placeholder="https://exemplo.com/imagem.png"
                        value={linkFormImage}
                        onChange={(e) => setLinkFormImage(e.target.value)}
                        className="w-full bg-black border border-white/10 focus:border-emerald-500 rounded p-2.5 text-xs text-slate-200 placeholder-slate-700 focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5 col-span-1">
                      <label className="text-[10px] text-slate-400 uppercase">
                        Ou Carregar do Computador
                      </label>
                      <div className="flex items-center gap-2">
                        <label className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold uppercase tracking-wider rounded cursor-pointer transition-all text-[10px] text-center font-mono">
                          <Upload className="w-3.5 h-3.5" />
                          Selecionar Arquivo
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                  const base64 = event.target?.result as string;
                                  setLinkFormImage(base64);
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                        {linkFormImage && (
                          <button
                            type="button"
                            onClick={() => setLinkFormImage("")}
                            className="px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] uppercase font-bold font-mono rounded transition-all cursor-pointer"
                          >
                            Limpar
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={resetLinkForm}
                      className="px-4 py-2 border border-white/10 hover:bg-white/5 rounded text-xs font-bold text-slate-400 uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold uppercase tracking-wider text-xs rounded transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />{" "}
                      {editingLinkId ? "Salvar Alterações" : "Adicionar Link"}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Grid Layout containing both Separate Screens side-by-side with identical sizes */}
          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            id="sites-perfis-grid"
          >
            {/* SCREEN 1: SITES CONSTRUÍDOS */}
            <div
              className="border border-white/10 bg-black/40 backdrop-blur-md rounded-xl p-5 sm:p-6 shadow-[inset_0_0_30px_rgba(16,185,129,0.03)] flex flex-col h-[570px] justify-between relative overflow-hidden"
              id="sites-terminal-screen"
            >
              {/* HUD Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4 font-mono uppercase tracking-widest text-slate-500 flex-shrink-0">
                <div className="flex items-center gap-2 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <Globe className="w-4 h-4" />
                  <span className="text-sm sm:text-base font-extrabold text-white tracking-wide">
                    SITES QUE CONSTRUÍ
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
                  {customLinks.filter((l) => l.type === "site").length} ITEMS
                </span>
              </div>

              {/* Horizontal scroll and navigation container */}
              <div className="relative flex-1 flex flex-col min-h-0 group/arrows">
                {/* Left navigation arrow - slightly transparent emerald theme */}
                <button
                  onClick={() => scrollSites("left")}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-2.5 rounded-full bg-black/80 hover:bg-emerald-500/20 text-emerald-400/80 hover:text-emerald-400 border border-white/10 hover:border-emerald-500/30 transition-all shadow-lg shadow-black/50 cursor-pointer flex items-center justify-center group active:scale-95"
                  aria-label="Sites anteriores"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                </button>

                {/* Right navigation arrow - slightly transparent emerald theme */}
                <button
                  onClick={() => scrollSites("right")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-2.5 rounded-full bg-black/80 hover:bg-emerald-500/20 text-emerald-400/80 hover:text-emerald-400 border border-white/10 hover:border-emerald-500/30 transition-all shadow-lg shadow-black/50 cursor-pointer flex items-center justify-center group active:scale-95"
                  aria-label="Próximos sites"
                >
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </button>

                {/* Horizontal Scroll track */}
                <div
                  ref={sitesScrollRef}
                  className="flex-1 overflow-x-auto gap-6 pb-6 pt-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth flex items-stretch"
                  id="sites-scroll-track"
                >
                  {customLinks.filter((l) => l.type === "site").length === 0 ? (
                    <div className="w-full flex-shrink-0 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-lg">
                      <p className="font-mono text-xs text-slate-500">
                        Nenhum site registrado no momento.
                      </p>
                    </div>
                  ) : (
                    customLinks
                      .filter((l) => l.type === "site")
                      .map((link) => (
                        <div
                          key={link.id}
                          className="w-[280px] sm:w-[350px] shrink-0 snap-center flex flex-col bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:border-emerald-500/20 hover:shadow-[0_4px_25px_rgba(16,185,129,0.05)] transition-all group"
                        >
                          <div className="h-44 border-b border-white/10 overflow-hidden bg-black relative flex-shrink-0">
                            {link.image ? (
                              <SafeImage
                                src={link.image}
                                alt={link.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                fallbackIcon={Globe}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-emerald-500/5 text-emerald-500/30">
                                <Globe className="w-8 h-8" />
                              </div>
                            )}
                          </div>
                          <div className="p-4 flex-1 flex flex-col justify-between">
                            <div className="space-y-2">
                              <h4 className="font-display font-bold text-sm text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                                {link.title}
                              </h4>
                              <p className="text-[11px] text-slate-400 leading-normal font-sans line-clamp-3 h-[50px] overflow-hidden">
                                {(() => {
                                  try {
                                    const parsed = JSON.parse(link.description);
                                    return parsed.intro || link.description;
                                  } catch {
                                    return link.description;
                                  }
                                })()}
                              </p>
                            </div>

                            <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5 text-xs font-mono flex-shrink-0">
                              <span
                                className="text-emerald-400/80 truncate max-w-[110px]"
                                title={link.url}
                              >
                                {link.url.replace(/^https?:\/\//i, "")}
                              </span>
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => setSelectedSite(link)}
                                  className="px-2 py-1 bg-black hover:bg-emerald-500 hover:text-black border border-white/10 rounded text-[9px] font-bold uppercase tracking-wider transition-all flex items-center gap-0.5 group/btn cursor-pointer ml-1"
                                >
                                  Abrir{" "}
                                  <ArrowUpRight className="w-2.5 h-2.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </div>

              {/* Slider footer bar hint */}
              <div className="flex items-center justify-between text-[9px] font-mono text-slate-600 mt-2 border-t border-white/5 pt-2 flex-shrink-0">
                <span>[PAINEL DE ROLAGEM HORIZONTAL]</span>
                <span>DESLIZE OU CLIQUE NAS SETAS ◄ ►</span>
              </div>
            </div>

            {/* SCREEN 2: PERFIS QUE DIVULGO */}
            <div
              className="border border-white/10 bg-black/40 backdrop-blur-md rounded-xl p-5 sm:p-6 shadow-[inset_0_0_30px_rgba(16,185,129,0.03)] flex flex-col h-[570px] justify-between relative overflow-hidden"
              id="perfis-terminal-screen"
            >
              {/* HUD Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4 font-mono uppercase tracking-widest text-slate-500 flex-shrink-0">
                <div className="flex items-center gap-2 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <Link2 className="w-4 h-4" />
                  <span className="text-sm sm:text-base font-extrabold text-white tracking-wide">
                    PERFIS QUE DIVULGO
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
                  {customLinks.filter((l) => l.type === "perfil").length} ITEMS
                </span>
              </div>

              {/* Horizontal scroll and navigation container */}
              <div className="relative flex-1 flex flex-col min-h-0 group/arrows">
                {/* Left navigation arrow - slightly transparent emerald theme */}
                <button
                  onClick={() => scrollPerfis("left")}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-2.5 rounded-full bg-black/80 hover:bg-emerald-500/20 text-emerald-400/80 hover:text-emerald-400 border border-white/10 hover:border-emerald-500/30 transition-all shadow-lg shadow-black/50 cursor-pointer flex items-center justify-center group active:scale-95"
                  aria-label="Perfis anteriores"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                </button>

                {/* Right navigation arrow - slightly transparent emerald theme */}
                <button
                  onClick={() => scrollPerfis("right")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-2.5 rounded-full bg-black/80 hover:bg-emerald-500/20 text-emerald-400/80 hover:text-emerald-400 border border-white/10 hover:border-emerald-500/30 transition-all shadow-lg shadow-black/50 cursor-pointer flex items-center justify-center group active:scale-95"
                  aria-label="Próximos perfis"
                >
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </button>

                {/* Horizontal Scroll track */}
                <div
                  ref={perfisScrollRef}
                  className="flex-1 overflow-x-auto gap-6 pb-6 pt-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth flex items-stretch"
                  id="perfis-scroll-track"
                >
                  {customLinks.filter((l) => l.type === "perfil").length ===
                  0 ? (
                    <div className="w-full flex-shrink-0 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-lg">
                      <p className="font-mono text-xs text-slate-500">
                        Nenhum perfil registrado no momento.
                      </p>
                    </div>
                  ) : (
                    customLinks
                      .filter((l) => l.type === "perfil")
                      .map((link) => (
                        <div
                          key={link.id}
                          className="w-[280px] sm:w-[350px] shrink-0 snap-center flex flex-col bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:border-emerald-500/20 hover:shadow-[0_4px_25px_rgba(16,185,129,0.05)] transition-all group"
                        >
                          <div className="h-44 border-b border-white/10 overflow-hidden bg-black relative flex-shrink-0">
                            {link.image ? (
                              <SafeImage
                                src={link.image}
                                alt={link.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                fallbackIcon={Link2}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-emerald-500/5 text-emerald-500/30">
                                <Link2 className="w-8 h-8" />
                              </div>
                            )}
                          </div>
                          <div className="p-4 flex-1 flex flex-col justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center gap-1.5">
                                <span className="text-[8px] font-mono font-bold uppercase bg-black text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/15">
                                  {link.platform || "Perfil"}
                                </span>
                              </div>
                              <h4 className="font-display font-bold text-sm text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                                {link.title}
                              </h4>
                              <p className="text-[11px] text-slate-400 leading-normal font-sans line-clamp-3 h-[50px] overflow-hidden">
                                {link.description}
                              </p>
                            </div>

                            <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5 text-xs font-mono flex-shrink-0">
                              <span
                                className="text-slate-500 truncate max-w-[110px]"
                                title={link.url}
                              >
                                {
                                  link.url
                                    .replace(/^https?:\/\//i, "")
                                    .split("/")[0]
                                }
                              </span>
                              <div className="flex items-center gap-1">
                                <a
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-2 py-1 bg-black hover:bg-emerald-500 hover:text-black border border-white/10 rounded text-[9px] font-bold uppercase tracking-wider transition-all flex items-center gap-0.5 group/btn cursor-pointer ml-1"
                                >
                                  Conectar{" "}
                                  <ArrowUpRight className="w-2.5 h-2.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </div>

              {/* Slider footer bar hint */}
              <div className="flex items-center justify-between text-[9px] font-mono text-slate-600 mt-2 border-t border-white/5 pt-2 flex-shrink-0">
                <span>[PAINEL DE ROLAGEM HORIZONTAL]</span>
                <span>DESLIZE OU CLIQUE NAS SETAS ◄ ►</span>
              </div>
            </div>
          </div>
        </section>

        {/* CERTIFICATES MODULE SECTION - CERTIFICADOS */}
        <section id="certificados" className="space-y-10 scroll-mt-20">
          <div className="border-l-4 border-emerald-500 pl-4 space-y-2">
            <h2 className="font-display text-3xl font-black tracking-tight text-white uppercase">
              Certificações & Cursos
            </h2>
            <p className="text-sm font-mono text-emerald-500">
              [SISTEMA DE ARQUIVOS DE DESENVOLVIMENTO PESSOAL]
            </p>
          </div>

          {/* Filter & Search Bar */}
          <div
            className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white/5 border border-white/10 p-4 rounded-lg"
            id="certificates-controls"
          >
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                { id: "all", label: "Todos" },
                { id: "banco-de-dados", label: "Bancos de Dados" },
                { id: "cloud", label: "Nuvem/MVP" },
                { id: "desenvolvimento", label: "Desenvolvimento" },
                { id: "lideranca", label: "Liderança" },
                { id: "bem-estar", label: "Bem-estar" },
              ].map((category) => (
                <button
                  key={category.id}
                  onClick={() => setCertFilter(category.id)}
                  className={`px-3 py-1.5 text-xs font-mono rounded transition-colors border cursor-pointer ${
                    certFilter === category.id
                      ? "bg-emerald-500 text-black font-bold border-emerald-400"
                      : "text-slate-400 border-transparent hover:text-white hover:bg-black"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Input search */}
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Pesquisar certificado..."
                value={certSearch}
                onChange={(e) => setCertSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-black border border-white/10 rounded text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          {/* Futuristic Terminal Screen with Horizontal Scroll for Certificates */}
          <div
            className="border border-white/10 bg-black/40 backdrop-blur-md rounded-xl p-5 sm:p-6 shadow-[inset_0_0_30px_rgba(16,185,129,0.03)] flex flex-col h-[590px] justify-between relative overflow-hidden"
            id="certificates-terminal-screen"
          >
            {/* HUD Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4 font-mono uppercase tracking-widest text-slate-500 flex-shrink-0">
              <div className="flex items-center gap-2 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <Award className="w-4 h-4" />
                <span className="text-xs sm:text-sm font-extrabold text-white tracking-wide">
                  CERTIFICADOS REGISTRADOS
                </span>
              </div>
              <span className="text-[10px] px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 font-bold">
                {filteredCertificates.length} ITEMS
              </span>
            </div>

            {/* Horizontal scroll and navigation container */}
            <div className="relative flex-1 flex flex-col min-h-0 group/arrows">
              {/* Left navigation arrow - slightly transparent emerald theme */}
              <button
                onClick={() => scrollCerts("left")}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-2.5 rounded-full bg-black/80 hover:bg-emerald-500/20 text-emerald-400/80 hover:text-emerald-400 border border-white/10 hover:border-emerald-500/30 transition-all shadow-lg shadow-black/50 cursor-pointer flex items-center justify-center group active:scale-95"
                aria-label="Certificados anteriores"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
              </button>

              {/* Right navigation arrow - slightly transparent emerald theme */}
              <button
                onClick={() => scrollCerts("right")}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-2.5 rounded-full bg-black/80 hover:bg-emerald-500/20 text-emerald-400/80 hover:text-emerald-400 border border-white/10 hover:border-emerald-500/30 transition-all shadow-lg shadow-black/50 cursor-pointer flex items-center justify-center group active:scale-95"
                aria-label="Próximos certificados"
              >
                <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* Scrollable content area */}
              <div
                ref={certsScrollRef}
                className="flex-1 overflow-x-auto gap-6 pb-6 pt-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth flex items-stretch"
                id="certificates-scroll-area"
              >
                {filteredCertificates.length === 0 ? (
                  <div className="w-full flex flex-col items-center justify-center border border-dashed border-white/10 rounded-lg py-12">
                    <p className="font-mono text-xs text-slate-500">
                      Nenhum certificado encontrado para o filtro ou busca
                      selecionada.
                    </p>
                  </div>
                ) : (
                  <AnimatePresence mode="popLayout">
                    {filteredCertificates.map((cert) => (
                      <motion.div
                        key={cert.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        onClick={() => setSelectedCert(cert)}
                        className="w-[310px] sm:w-[400px] shrink-0 snap-center bg-white/5 border border-white/10 hover:border-emerald-500/20 rounded-lg p-4 cursor-pointer transition-all flex flex-col justify-between relative group hover:shadow-[0_4px_25px_rgba(16,185,129,0.1)]"
                        id={`cert-item-${cert.id}`}
                      >
                        <div className="space-y-3">
                          <div className="h-52 rounded overflow-hidden bg-black relative border border-white/10">
                            <SafeImage
                              src={cert.image}
                              alt={cert.title}
                              className="w-full h-full object-cover group-hover:scale-102 transition-transform"
                              fallbackIcon={Award}
                            />
                            <div className="absolute top-2 right-2 bg-black/90 border border-white/10 text-[9px] font-mono text-slate-400 px-2 py-0.5 rounded uppercase font-bold">
                              {cert.duration}
                            </div>
                          </div>

                          <div className="space-y-1">
                            <h3 className="font-display font-bold text-sm text-slate-200 group-hover:text-emerald-400 transition-colors line-clamp-1">
                              {cert.title}
                            </h3>
                            <p className="text-[11px] font-mono text-slate-500">
                              {cert.issuer}
                            </p>
                          </div>

                          <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                            {cert.summary}
                          </p>
                        </div>

                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-4 mt-2 border-t border-white/5">
                          <span className="text-emerald-400/80 font-bold">
                            {cert.date}
                          </span>
                          <span className="text-slate-400 group-hover:text-emerald-400 transition-colors inline-flex items-center gap-1">
                            Expandir <ArrowUpRight className="w-3" />
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>
            </div>

            {/* Scroll footer bar hint */}
            <div className="flex items-center justify-between text-[9px] font-mono text-slate-600 mt-2 border-t border-white/5 pt-2 flex-shrink-0">
              <span>[SISTEMA DE ARQUIVOS]</span>
              <span>DESLIZE PARA OS LADOS OU CLIQUE NAS SETAS ◄ ►</span>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION - CONTATO */}
        <section id="contato" className="space-y-10 scroll-mt-20">
          <div className="border-l-4 border-emerald-500 pl-4 space-y-2">
            <h2 className="font-display text-3xl font-black tracking-tight text-white uppercase">
              Contato & Conexão
            </h2>
            <p className="text-sm font-mono text-emerald-500">
              [ABRA UMA CHAMADA OU ENVIE UMA MENSAGEM CRIPTOGRAFADA]
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Contact Quick Cards */}
            <div className="lg:col-span-5 space-y-4">
              <div
                className="bg-white/5 border border-white/10 p-6 rounded-lg space-y-4"
                id="contact-info-block"
              >
                <h3 className="font-display font-bold text-lg text-white">
                  Canais de Comunicação
                </h3>
                <p className="text-xs text-slate-400">
                  Respostas garantidas em menos de 24 horas. Use a plataforma
                  que preferir.
                </p>

                <div className="space-y-3 pt-2">
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 bg-black/40 hover:bg-black border border-white/10 hover:border-emerald-500/30 rounded transition-all text-xs text-slate-300 group"
                  >
                    <span className="flex items-center gap-2 font-mono">
                      <Linkedin className="w-4 h-4 text-emerald-400" />
                      linkedin.com/rogerio
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-emerald-400" />
                  </a>

                  <a
                    href={`https://wa.me/5521990887330`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 bg-black/40 hover:bg-black border border-white/10 hover:border-emerald-500/30 rounded transition-all text-xs text-slate-300 group"
                  >
                    <span className="flex items-center gap-2 font-mono">
                      <Phone className="w-4 h-4 text-emerald-400" />
                      whatsapp/chamada-direta
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-emerald-400" />
                  </a>

                  <div className="p-3.5 bg-black/20 border border-dashed border-white/10 rounded text-xs font-mono text-slate-400 space-y-1">
                    <p className="text-slate-500 uppercase tracking-widest text-[9px] font-bold">
                      Coordenadas Gerais:
                    </p>
                    <p className="text-slate-300 flex items-center gap-1 font-semibold">
                      <MapPin className="w-3 h-3 text-emerald-400" />
                      Rio de Janeiro - RJ, Brasil
                    </p>
                    <p className="text-[11px] text-slate-400 break-all">
                      rogerioignacio85@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Email form layout */}
            <div
              className="lg:col-span-7 bg-white/5 border border-white/10 p-6 rounded-lg"
              id="contact-form-block"
            >
              <form
                onSubmit={handleEmailSubmit}
                className="space-y-4 font-mono text-xs"
              >
                <div className="space-y-1">
                  <span className="text-[11px] text-emerald-400 tracking-widest uppercase font-bold">
                    Formulário de Mensagem
                  </span>
                  <p className="text-xs text-slate-400">
                    Insira seus dados para encaminhar um e-mail imediato de
                    contato.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-400 uppercase">
                      Seu Nome *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nome do Recrutador"
                      value={formNome}
                      onChange={(e) => setFormNome(e.target.value)}
                      className="w-full bg-black border border-white/10 focus:border-emerald-500 rounded p-3 text-xs text-slate-200 placeholder-slate-700 focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-400 uppercase">
                      Seu E-mail *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="seu.email@empresa.com"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className="w-full bg-black border border-white/10 focus:border-emerald-500 rounded p-3 text-xs text-slate-200 placeholder-slate-700 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-400 uppercase">
                    Mensagem *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Olá Rogério, gostaria de conversar sobre oportunidades de desenvolvimento..."
                    value={formMensagem}
                    onChange={(e) => setFormMensagem(e.target.value)}
                    className="w-full bg-black border border-white/10 focus:border-emerald-500 rounded p-3 text-xs text-slate-200 placeholder-slate-700 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-bold uppercase rounded transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    Enviar Canal de Comunicação
                  </button>
                </div>

                {formSent && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded flex items-center gap-2 text-emerald-400 text-[11px]"
                  >
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    Encaminhando para o cliente de e-mail local... Caso não
                    tenha aberto, envie para rogerioignacio85@gmail.com.
                  </motion.div>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer
        className="border-t border-white/10 bg-black/80 py-8 text-center text-[11px] font-mono text-slate-500"
        id="app-footer"
      >
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p>
            &copy; {new Date().getFullYear()} Rogério Ignácio Barbosa. Todos os
            direitos reservados.
          </p>
          <p className="text-emerald-500/80 uppercase tracking-widest">
            Construído em React 19 + Tailwind CSS + Framer Motion. Segurança
            Core Ativa.
          </p>
        </div>
      </footer>

      {/* MODAL - DETALHES DO CERTIFICADO */}
      <AnimatePresence>
        {selectedCert && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            id="cert-modal-container"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto z-10 font-mono text-xs relative"
              id="cert-modal-content"
            >
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 bg-black border-b border-white/10">
                <span className="text-emerald-400 font-bold uppercase tracking-wider">
                  Detalhamento de Certificação
                </span>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-1 hover:bg-white/5 text-slate-400 hover:text-white rounded transition-colors text-sm cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Image panel */}
                <div className="rounded-lg overflow-hidden border border-white/10 bg-black">
                  <SafeImage
                    src={selectedCert.image}
                    alt={selectedCert.title}
                    className="w-full h-full object-contain"
                    fallbackIcon={Award}
                  />
                </div>

                {/* Info block */}
                <div className="space-y-2">
                  <h3 className="font-display font-black text-lg text-white leading-tight">
                    {selectedCert.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                    <span>Emissor: {selectedCert.issuer}</span>
                    <span>Carga: {selectedCert.duration}</span>
                    <span>Data: {selectedCert.date}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold">
                      Sobre o Curso
                    </p>
                    <p className="text-slate-300 leading-relaxed font-sans text-xs">
                      {selectedCert.summary}
                    </p>
                  </div>

                  {selectedCert.modules && selectedCert.modules.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold">
                        Módulos & Eixos de Conhecimento
                      </p>
                      <ul className="space-y-1.5 list-none pl-0">
                        {selectedCert.modules.map((m, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-[11px] text-slate-300 font-sans leading-relaxed"
                          >
                            <ChevronRight className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>
                              {m.split(/(\*\*.*?\*\*)/).map((part, i) =>
                                part.startsWith("**") && part.endsWith("**") ? (
                                  <strong key={i} className="text-slate-100">
                                    {part.slice(2, -2)}
                                  </strong>
                                ) : (
                                  part
                                )
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedCert.conclusion && (
                    <div className="space-y-2">
                      <p className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold">
                        Considerações Finais
                      </p>
                      <p className="text-slate-300 leading-relaxed font-sans text-xs">
                        {selectedCert.conclusion}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal footer */}
              <div className="p-4 bg-black border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setSelectedCert(null)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 rounded uppercase font-bold text-[10px] tracking-wider transition-colors cursor-pointer"
                >
                  Fechar Registro
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL - DETALHES DO PROJETO */}
      <AnimatePresence>
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            id="project-modal-container"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto z-10 font-mono text-xs relative"
              id="project-modal-content"
            >
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 bg-black border-b border-white/10">
                <span className="text-emerald-400 font-bold uppercase tracking-wider">
                  Especificações do Sistema
                </span>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1 hover:bg-white/5 text-slate-400 hover:text-white rounded transition-colors text-sm cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-6 font-sans">
                {/* Image panel */}
                <div className="rounded-lg overflow-hidden border border-white/10 bg-black h-52">
                  <SafeImage
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                    fallbackIcon={Cpu}
                  />
                </div>

                {/* Info block */}
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-1">
                    {selectedProject.status}
                  </div>
                  <h3 className="font-display font-black text-xl text-white leading-tight">
                    {selectedProject.title}
                  </h3>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                    {selectedProject.tagline}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <p className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold">
                      Resumo da Pesquisa
                    </p>
                    <p className="text-slate-300 leading-relaxed font-sans text-xs">
                      {selectedProject.summary}
                    </p>
                  </div>

                  {/* Feature list */}
                  <div className="space-y-2">
                    <p className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold">
                      Eixos Funcionais do Protótipo
                    </p>
                    <ul className="space-y-1.5 list-none pl-0">
                      {selectedProject.details.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-[11px] text-slate-300 font-sans leading-relaxed"
                        >
                          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technical specs table */}
                  <div className="space-y-2.5">
                    <p className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold">
                      Ficha de Especificações Técnicas
                    </p>
                    <div className="bg-black rounded border border-white/10 overflow-hidden">
                      {Object.entries(selectedProject.specs).map(
                        ([key, val], idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-2.5 text-[11px] border-b border-white/5 last:border-b-0 even:bg-white/2"
                          >
                            <span className="text-slate-400 uppercase">
                              {key}
                            </span>
                            <span className="text-slate-200 font-bold">
                              {val}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal footer */}
              <div className="p-4 bg-black border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 rounded uppercase font-bold text-[10px] tracking-wider transition-colors cursor-pointer"
                >
                  Fechar Análise
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL - DETALHES DO SITE CONSTRUÍDO */}
      <AnimatePresence>
        {selectedSite && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            id="site-modal-container"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSite(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden shadow-2xl max-w-xl w-full max-h-[85vh] overflow-y-auto z-10 font-mono text-xs relative"
              id="site-modal-content"
            >
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 bg-black border-b border-white/10">
                <span className="text-emerald-400 font-bold uppercase tracking-wider">
                  Sobre o projeto
                </span>
                <button
                  onClick={() => setSelectedSite(null)}
                  className="p-1 hover:bg-white/5 text-slate-400 hover:text-white rounded transition-colors text-sm cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Image panel */}
                <div className="rounded-lg overflow-hidden border border-white/10 bg-black h-52">
                  <SafeImage
                    src={selectedSite.image || ""}
                    alt={selectedSite.title}
                    className="w-full h-full object-cover"
                    fallbackIcon={Globe}
                  />
                </div>

                {/* Info block */}
                <div className="space-y-2">
                  <h3 className="font-display font-black text-lg text-white leading-tight">
                    {selectedSite.title}
                  </h3>
                  <div className="space-y-1.5">
                    <p className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold">
                      Descrição do Projeto
                    </p>
                    {(() => {
                      try {
                        const review = JSON.parse(selectedSite.description);
                        return (
                          <div className="space-y-4 font-sans text-slate-300 text-xs">
                            <p className="text-slate-400 text-[10px] uppercase tracking-wider">
                              {review.subtitle}
                            </p>
                            <p className="leading-relaxed">{review.intro}</p>
                            {review.sections.map((sec: any, i: number) => (
                              <div key={i} className="space-y-2">
                                <h4 className="font-bold text-sm text-emerald-400 font-display border-l-2 border-emerald-500/50 pl-2">
                                  {sec.title}
                                </h4>
                                <p className="leading-relaxed whitespace-pre-line">
                                  {sec.content}
                                </p>
                              </div>
                            ))}
                            {review.quote && (
                              <blockquote className="border-l-4 border-emerald-500/50 pl-4 py-2 my-4 bg-black/30 rounded-r-lg">
                                <p className="italic text-slate-300">
                                  "{review.quote}"
                                </p>
                              </blockquote>
                            )}
                            {review.table && (
                              <div className="space-y-2">
                                <h4 className="font-bold text-sm text-emerald-400 font-display border-l-2 border-emerald-500/50 pl-2">
                                  {review.table.title}
                                </h4>
                                <div className="border border-white/10 rounded-lg overflow-hidden">
                                  <table className="w-full text-left text-[11px]">
                                    <thead className="bg-black/50">
                                      <tr>
                                        {review.table.headers.map(
                                          (h: string, i: number) => (
                                            <th
                                              key={i}
                                              className="p-2 uppercase tracking-wider text-emerald-400 font-mono"
                                            >
                                              {h}
                                            </th>
                                          )
                                        )}
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {review.table.rows.map(
                                        (r: string[], i: number) => (
                                          <tr
                                            key={i}
                                            className="border-t border-white/10"
                                          >
                                            <td className="p-2 font-semibold text-slate-200">
                                              {r[0]}
                                            </td>
                                            <td className="p-2 text-slate-400 leading-relaxed">
                                              {r[1]}
                                            </td>
                                          </tr>
                                        )
                                      )}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            )}
                            <p className="leading-relaxed pt-2">
                              {review.conclusion}
                            </p>
                          </div>
                        );
                      } catch (e) {
                        return (
                          <p className="text-slate-300 leading-relaxed font-sans text-xs whitespace-pre-line">
                            {selectedSite.description}
                          </p>
                        );
                      }
                    })()}
                  </div>
                </div>
              </div>

              {/* Modal footer */}
              <div className="p-4 bg-black border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => setSelectedSite(null)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 rounded uppercase font-bold text-[10px] tracking-wider transition-colors cursor-pointer"
                >
                  Fechar Análise
                </button>
                <a
                  href={selectedSite.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold uppercase tracking-wider text-xs rounded transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  Visitar Site
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
} 