import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { accordionProjects } from '../data/projects'
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function StackedProjects() {
  const navigate = useNavigate()
  const projects = accordionProjects

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {projects.map((project) => {
        const { imageFit, video, tags } = project as {
          imageFit?: 'contain' | 'cover'
          video?: string
          tags?: string[]
        }
        const fitClass = `h-full w-full ${imageFit === 'contain' ? 'object-contain' : 'object-cover'}`

        return (
          // Card is a div; the button wrapper is what makes the whole thing
          // focusable and keyboard-activatable.
          <button
            key={project.id}
            type="button"
            onClick={() => navigate(`/projects/${project.slug}`)}
            className="group block w-full text-left"
          >
            <Card className="gap-0 p-2 transition-shadow hover:shadow-card">
              {/* Media well — inner radius = outer 12px minus the 8px of padding */}
              <div className="relative aspect-video overflow-hidden rounded-[4px] bg-muted">
                {video ? (
                  <video
                    src={video}
                    poster={project.image}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    aria-label={project.title}
                    className={fitClass}
                  />
                ) : (
                  project.image && <img src={project.image} alt={project.title} className={fitClass} />
                )}
              </div>

              {/* CardHeader puts the action in column 2 and the description on
                  row 2, which is exactly title / tags / arrow. */}
              <CardHeader className="gap-2 px-2 pt-3 pb-1">
                <CardTitle className="text-heading-16 text-foreground">{project.title}</CardTitle>
                {tags && (
                  <CardDescription className="flex flex-wrap gap-1.5">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-label-12 font-normal">
                        {tag}
                      </Badge>
                    ))}
                  </CardDescription>
                )}
                <CardAction>
                  <ArrowRight
                    size={16}
                    className="shrink-0 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                  />
                </CardAction>
              </CardHeader>
            </Card>
          </button>
        )
      })}
    </div>
  )
}
