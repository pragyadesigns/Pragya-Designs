import { Link } from 'react-router-dom'
import { accordionProjects } from '../data/projects'

export default function WhatIDo() {
  return (
    <section id="work" className="py-16 px-6 md:px-10 max-w-5xl mx-auto">
      <p className="text-xs tracking-widest uppercase text-muted mb-10">
        What do I do?
      </p>

      {/* Tagline */}
      <p className="text-2xl md:text-3xl font-light leading-tight tracking-tight text-ink mb-12 max-w-3xl">
        Enterprise UX that increases adoption, speeds up workflows, and improves
        decision-making.
      </p>

      {/* Project cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {accordionProjects.map((project) => (
          <Link
            key={project.id}
            to={`/projects/${project.slug}`}
            className="group flex flex-col rounded-2xl border border-border bg-white overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="aspect-[4/3] w-full bg-stone-100 overflow-hidden">
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className={`w-full h-full ${
                    (project as { imageFit?: 'contain' | 'cover' }).imageFit === 'contain'
                      ? 'object-contain'
                      : 'object-cover'
                  } transition-transform duration-500 group-hover:scale-[1.02]`}
                />
              )}
            </div>
            <div className="p-6">
              <h3 className="text-lg md:text-xl font-medium text-ink leading-snug mb-2">
                {project.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {project.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
