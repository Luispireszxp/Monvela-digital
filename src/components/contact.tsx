"use client";

import { useActionState } from "react";
import { submitLead, type LeadFormState } from "@/app/actions";
import { siteConfig } from "@/content/site";
import { WhatsAppLink } from "./whatsapp-link";

const initialState: LeadFormState = { status: "idle" };
const { contactSection: content } = siteConfig;

export function Contact() {
  const [state, formAction, pending] = useActionState(submitLead, initialState);

  return (
    <section id="contato" className="section light-section contact" aria-labelledby="contact-title">
      <div className="shell split-section">
        <div className="section-heading section-heading-light">
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 id="contact-title">{content.title}</h2>
          <p className="section-description">{content.description}</p>
          <WhatsAppLink source="contact" className="text-link contact-whatsapp">
            {content.whatsappLabel} <span aria-hidden="true">↗</span>
          </WhatsAppLink>
        </div>

        <form className="contact-form" action={formAction} noValidate>
          <label className="field">
            <span>{content.fields.name}</span>
            <input name="name" type="text" required maxLength={120} autoComplete="name" />
          </label>

          <label className="field">
            <span>{content.fields.contact}</span>
            <input name="contact" type="text" required maxLength={160} autoComplete="tel" />
          </label>

          <div className="field-row">
            <label className="field">
              <span>
                {content.fields.business} <em>({content.fields.optional})</em>
              </span>
              <input name="business" type="text" maxLength={160} autoComplete="organization" />
            </label>
            <label className="field">
              <span>
                {content.fields.segment} <em>({content.fields.optional})</em>
              </span>
              <input name="segment" type="text" maxLength={80} />
            </label>
          </div>

          <label className="field">
            <span>
              {content.fields.message} <em>({content.fields.optional})</em>
            </span>
            <textarea name="message" rows={4} maxLength={2000} />
          </label>

          {/* honeypot anti-bot: fora da tela, ignorado por humanos */}
          <input
            type="text"
            name="company_url"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="contact-hp"
          />

          <div className="contact-submit">
            <button className="button" type="submit" disabled={pending}>
              {pending ? "Enviando…" : content.submitLabel}
            </button>
            <p
              aria-live="polite"
              className={`form-status${state.status !== "idle" ? ` form-status-${state.status}` : ""}`}
            >
              {state.message}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
