import { experience, education } from '../data/experience'

function Group({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex gap-8 md:gap-16">
      {/* Sticky left label */}
      <div className="w-28 md:w-36 shrink-0">
        <p
          className="text-xs tracking-widest uppercase text-muted sticky top-16 pt-1"
        >
          {label}
        </p>
      </div>

      {/* Scrolling entries */}
      <div className="flex-1 divide-y divide-border">{children}</div>
    </div>
  )
}

export default function Experience() {
  return (
    <section className="py-16 px-6 md:px-10 max-w-5xl mx-auto">
      <p className="text-xs tracking-widest uppercase text-muted mb-12">
        What's my work experience?
      </p>

      <div className="flex flex-col gap-0">
        {/* Experience group */}
        <Group label="Experience">
          {experience.map((role) => (
            <div key={role.index} className="py-8">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-ink mb-3">
                    {role.title}{' '}
                    <span className="font-normal text-muted">@ {role.org}</span>
                  </p>
                  <ul className="space-y-1.5">
                    {role.bullets.map((b) => (
                      <li key={b} className="text-xs text-muted flex gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-muted shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-xs text-muted shrink-0 sm:text-right sm:w-32 sm:pt-0.5">{role.period}</p>
              </div>
            </div>
          ))}
        </Group>

        {/* Divider between groups */}
        <div className="h-px bg-border my-4 ml-[calc(7rem+2rem)] md:ml-[calc(9rem+4rem)]" />

        {/* Education group */}
        <Group label="Education">
          {education.map((entry) => (
            <div key={entry.index} className="py-8">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-ink mb-3">
                    {entry.degree}{' '}
                    <span className="font-normal text-muted">
                      @ {entry.school}
                    </span>
                  </p>
                  {entry.bullets && entry.bullets.length > 0 && (
                    <ul className="space-y-1.5">
                      {entry.bullets.map((b) => (
                        <li key={b} className="text-xs text-muted flex gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-muted shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <p className="text-xs text-muted shrink-0 sm:text-right sm:w-32 sm:pt-0.5">{entry.period}</p>
              </div>
            </div>
          ))}
        </Group>
      </div>
    </section>
  )
}
