import { BrainCircuit, ChartNoAxesCombined, Network, Sparkles, Database, Route, ShieldCheck, type LucideIcon } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';

type WorkCard = {
  title: string;
  description: string;
  icon: LucideIcon;
  skills: string[];
};

const AI_WORK: WorkCard[] = [
  {
    title: 'Supervised Learning & Model Optimization',
    description: 'My supervised learning work brings together feature engineering, ensemble models, and hyperparameter tuning to develop and refine predictive models.',
    icon: BrainCircuit,
    skills: ['Supervised Learning', 'Feature Engineering', 'Ensemble Models', 'Hyperparameter Tuning'],
  },
  {
    title: 'Stock-Market Prediction',
    description: 'Exploring stock-market prediction using financial news alongside OHLCV data: open, high, low, close, and trading volume. My work includes named entity recognition (NER) and ticker extraction to connect news with relevant stocks.',
    icon: ChartNoAxesCombined,
    skills: ['Financial News', 'OHLCV Data', 'NER', 'Ticker Extraction'],
  },
  {
    title: 'Unsupervised Clustering',
    description: 'Applying unsupervised clustering to explore patterns and group similar observations in data without predefined labels.',
    icon: Network,
    skills: ['Unsupervised Learning', 'Clustering', 'Pattern Discovery'],
  },
  {
    title: 'Transformers & LLM Fine-Tuning',
    description: 'Working with Transformer-based models and fine-tuning large language models, including decoder models, using Hugging Face and Python in Google Colab.',
    icon: Sparkles,
    skills: ['Transformers', 'LLM Fine-Tuning', 'Decoder Models'],
  },
];

const LARAVEL_WORK: WorkCard[] = [
  {
    title: 'Database & CRUD Projects',
    description: 'Completed practical PHP and Laravel training projects using MySQL and CRUD operations to create, read, update, and delete application records.',
    icon: Database,
    skills: ['PHP', 'Laravel', 'MySQL', 'CRUD Operations'],
  },
  {
    title: 'Routing & MVC Architecture',
    description: 'Applied Laravel routing and the Model–View–Controller architecture in training projects, organizing application requests, data, and views into a structured backend.',
    icon: Route,
    skills: ['Routing', 'MVC Architecture', 'Backend Development'],
  },
  {
    title: 'Authentication & Backend Logic',
    description: 'Practiced authentication and backend development through coursework and completed web development projects during my PNY Training under the NAVTEC program.',
    icon: ShieldCheck,
    skills: ['Authentication', 'PHP Web Development', 'Application Logic'],
  },
];

function WorkCards({ cards }: { cards: WorkCard[] }) {
  return (
    <div className={`grid gap-6 ${cards.length === 3 ? 'lg:grid-cols-3' : 'md:grid-cols-2'}`}>
      {cards.map(({ title, description, icon: Icon, skills }) => (
        <article key={title} className="glass-panel rounded-3xl p-6 md:p-8 flex flex-col">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center mb-6">
            <Icon aria-hidden="true" className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-display font-bold text-zinc-900 dark:text-white mb-3">{title}</h3>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">{description}</p>
          <ul aria-label={`${title} skills`} className="flex flex-wrap gap-2 mt-auto">
            {skills.map(skill => (
              <li key={skill} className="rounded-full px-3 py-1 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">{skill}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

export function AIML() {
  return (
    <section id="ai-ml" aria-label="AI/ML" className="py-24 scroll-mt-24 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="container mx-auto px-6 max-w-6xl">
        <SectionHeader title="AI / ML" subtitle="Data, Models & Language" />
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
            From feature engineering and predictive modeling to financial NLP and language model fine-tuning, I use machine learning to explore data and build intelligent applications.
          </p>
          <ul aria-label="AI/ML tools" className="flex flex-wrap justify-center gap-3">
            {['Python', 'Scikit-learn', 'Hugging Face', 'Google Colab'].map(tool => (
              <li key={tool} className="px-4 py-2 rounded-xl text-sm font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-500/10">{tool}</li>
            ))}
          </ul>
        </div>
        <WorkCards cards={AI_WORK} />
      </div>
    </section>
  );
}

export function PHPLaravel() {
  return (
    <section id="php-laravel" aria-label="PHP & Laravel" className="py-24 scroll-mt-24">
      <div className="container mx-auto px-6 max-w-6xl">
        <SectionHeader title="PHP & Laravel" subtitle="Web & Backend Development" />
        <div className="glass-panel rounded-3xl p-6 md:p-8 mb-8 border-l-4 border-l-blue-600">
          <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">PNY Training · NAVTEC Program</p>
          <h3 className="text-2xl font-display font-bold text-zinc-900 dark:text-white mb-3">Practical training. Completed web projects.</h3>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
            During my PNY Training under the NAVTEC program, I completed web development projects with PHP, Laravel, and MySQL. My hands-on work covered routing, MVC architecture, CRUD operations, authentication, and backend development.
          </p>
        </div>
        <WorkCards cards={LARAVEL_WORK} />
      </div>
    </section>
  );
}
