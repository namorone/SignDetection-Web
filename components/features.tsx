import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, Mic, BookOpen, BarChart } from "lucide-react"

export function Features() {
  return (
    <section className="py-12 px-4 md:py-24">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Key Features</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Our platform offers a comprehensive set of tools to help bridge the communication gap between sign language
            and spoken language.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <Camera className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Sign Language Recognition</CardTitle>
              <CardDescription>
                Real-time recognition of Ukrainian sign language using advanced computer vision.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our neural network can accurately recognize and translate Ukrainian sign language gestures into text.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <Mic className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Speech-to-Text</CardTitle>
              <CardDescription>Convert spoken Ukrainian into text for seamless communication.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our audio recognition system accurately transcribes spoken Ukrainian language in real-time.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <BookOpen className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Interactive Learning</CardTitle>
              <CardDescription>Learn sign language through our interactive training modules.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Practice and improve your sign language skills with our guided training system that provides real-time
                feedback.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <BarChart className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Progress Tracking</CardTitle>
              <CardDescription>Monitor your learning journey with detailed progress analytics.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Track your improvement over time with comprehensive statistics and personalized recommendations.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
