import { useState } from 'react';
import '../../index.css';
import { useTranslation } from "react-i18next";

const HomeAccordion: React.FC = () => {

	const [activeAccordion, setActiveAccordion] = useState<{[key: string]: boolean}>({
		accordion1: false,
		accordion2: false,
		accordion3: false,
		accordion4: false,
		accordion5: false
	});
  const { t, i18n } = useTranslation(['str']);

	return (
		<div className='mx-6 max-w-screen lg:mx-72 lg:my-6 md:mx-48 md:my-6 sm:mx-16 sm:my-6 xs:mx-6'>
			<h2>
					<div className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-700 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3" aria-expanded="true" aria-controls="accordion-flush-body-1" >
						<span className='text-xl'>{t('homePage.homeAccordion.preguntasFrecuentes')}</span>
					</div>
				</h2>
			<div id="accordion-flush" data-accordion="collapse" data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white" data-inactive-classes="text-gray-500 dark:text-gray-400">
				<h2 id="accordion-flush-heading-1">
					<button type="button" className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3" data-accordion-target="#accordion-flush-body-1" aria-expanded={activeAccordion.accordion1} aria-controls="accordion-flush-body-1" onClick={() => setActiveAccordion({accordion1: !activeAccordion.accordion1, accordion2: activeAccordion.accordion2, accordion3: activeAccordion.accordion3, accordion4: activeAccordion.accordion4, accordion5: activeAccordion.accordion5})}>
						<span>{t('homePage.homeAccordion.question1')}</span>
						<svg data-accordion-icon className={activeAccordion.accordion1 ? "w-3 h-3 shrink-0" : "w-3 h-3 rotate-180 shrink-0"} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
							<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
						</svg>
					</button>
				</h2>
				<div id="accordion-flush-body-1" className={activeAccordion.accordion1 ? "" : "hidden"} aria-labelledby="accordion-flush-heading-1">
					<div className="py-5 border-b border-gray-200 dark:border-gray-700">
						<p className="mb-2 text-gray-500 dark:text-gray-400">{t('homePage.homeAccordion.response1')}</p>
					</div>
				</div>

				<h2 id="accordion-flush-heading-1">
					<button type="button" className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3" data-accordion-target="#accordion-flush-body-1" aria-expanded={activeAccordion.accordion1} aria-controls="accordion-flush-body-1" onClick={() => setActiveAccordion({accordion1: activeAccordion.accordion1, accordion2: !activeAccordion.accordion2, accordion3: activeAccordion.accordion3, accordion4: activeAccordion.accordion4, accordion5: activeAccordion.accordion5})}>
						<span>{t('homePage.homeAccordion.question2')}</span>
						<svg data-accordion-icon className={activeAccordion.accordion2 ? "w-3 h-3 shrink-0" : "w-3 h-3 rotate-180 shrink-0"} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
							<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
						</svg>
					</button>
				</h2>
				<div id="accordion-flush-body-1" className={activeAccordion.accordion2 ? "" : "hidden"} aria-labelledby="accordion-flush-heading-1">
					<div className="py-5 border-b border-gray-200 dark:border-gray-700">
						<p className="mb-2 text-gray-500 dark:text-gray-400">{t('homePage.homeAccordion.response2')}</p>
					</div>
				</div>

				<h2 id="accordion-flush-heading-1">
					<button type="button" className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3" data-accordion-target="#accordion-flush-body-1" aria-expanded={activeAccordion.accordion1} aria-controls="accordion-flush-body-1" onClick={() => setActiveAccordion({accordion1: activeAccordion.accordion1, accordion2: activeAccordion.accordion2, accordion3: !activeAccordion.accordion3, accordion4: activeAccordion.accordion4, accordion5: activeAccordion.accordion5})}>
						<span>{t('homePage.homeAccordion.question3')}</span>
						<svg data-accordion-icon className={activeAccordion.accordion3 ? "w-3 h-3 shrink-0" : "w-3 h-3 rotate-180 shrink-0"} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
							<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
						</svg>
					</button>
				</h2>
				<div id="accordion-flush-body-1" className={activeAccordion.accordion3 ? "" : "hidden"} aria-labelledby="accordion-flush-heading-1">
					<div className="py-5 border-b border-gray-200 dark:border-gray-700">
						<p className="mb-2 text-gray-500 dark:text-gray-400">{t('homePage.homeAccordion.response3')}</p>
					</div>
				</div>

				<h2 id="accordion-flush-heading-1">
					<button type="button" className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3" data-accordion-target="#accordion-flush-body-1" aria-expanded={activeAccordion.accordion1} aria-controls="accordion-flush-body-1" onClick={() => setActiveAccordion({accordion1: activeAccordion.accordion1, accordion2: activeAccordion.accordion2, accordion3: activeAccordion.accordion3, accordion4: !activeAccordion.accordion4, accordion5: activeAccordion.accordion5})}>
						<span>{t('homePage.homeAccordion.question4')}</span>
						<svg data-accordion-icon className={activeAccordion.accordion4 ? "w-3 h-3 shrink-0" : "w-3 h-3 rotate-180 shrink-0"} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
							<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
						</svg>
					</button>
				</h2>
				<div id="accordion-flush-body-1" className={activeAccordion.accordion4 ? "" : "hidden"} aria-labelledby="accordion-flush-heading-1">
					<div className="py-5 border-b border-gray-200 dark:border-gray-700">
						<p className="mb-2 text-gray-500 dark:text-gray-400">{t('homePage.homeAccordion.response4')}</p>
					</div>
				</div>

				<h2 id="accordion-flush-heading-1">
					<button type="button" className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3" data-accordion-target="#accordion-flush-body-1" aria-expanded={activeAccordion.accordion1} aria-controls="accordion-flush-body-1" onClick={() => setActiveAccordion({accordion1: activeAccordion.accordion1, accordion2: activeAccordion.accordion2, accordion3: activeAccordion.accordion3, accordion4: activeAccordion.accordion4, accordion5: !activeAccordion.accordion5})}>
						<span>{t('homePage.homeAccordion.question5')}</span>
						<svg data-accordion-icon className={activeAccordion.accordion5 ? "w-3 h-3 shrink-0" : "w-3 h-3 rotate-180 shrink-0"} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
							<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
						</svg>
					</button>
				</h2>
				<div id="accordion-flush-body-1" className={activeAccordion.accordion5 ? "" : "hidden"} aria-labelledby="accordion-flush-heading-1">
					<div className="py-5 border-b border-gray-200 dark:border-gray-700">
						<p className="mb-2 text-gray-500 dark:text-gray-400">{t('homePage.homeAccordion.response5')}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomeAccordion;