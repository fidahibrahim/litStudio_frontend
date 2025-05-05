import { PenTool, ArrowRight, BookOpen, Bookmark, Star, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {

  const features = [
    {
      icon: <BookOpen className="h-6 w-6 text-indigo-500" />,
      title: "Easy Publishing",
      description: "Create and publish blog posts in minutes with our intuitive editor."
    },
    {
      icon: <Bookmark className="h-6 w-6 text-indigo-500" />,
      title: "Content Organization",
      description: "Categorize and manage your content with powerful organizational tools."
    },
    {
      icon: <Star className="h-6 w-6 text-indigo-500" />,
      title: "Analytics Dashboard",
      description: "Track reader engagement and growth with comprehensive analytics."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation - Sleeker design */}
      <Header/>

      {/* Hero Section - More visually appealing */}
      <div id="home" className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-28 bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                <div className="sm:text-center lg:text-left lg:col-span-6">
                  <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:leading-tight">
                    <span className="block">Manage your blogs</span>
                    <span className="block text-indigo-600">with ease and style</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    A comprehensive solution for bloggers and content creators. Organize, publish, and analyze your content all in one place.
                  </p>
                  <div className="mt-8 sm:mt-10 sm:flex sm:justify-center lg:justify-start">
                    <div className="rounded-md shadow">
                      <Link to='/register'>
                      <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 md:py-4 md:text-lg md:px-10 transition-all">
                        Get Started
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
                  <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                    <div className="relative block w-full bg-white rounded-lg overflow-hidden">
                      <img className="w-full" src="/banner.jpg" alt="Dashboard preview" />
                      <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                        <div className="bg-white bg-opacity-75 rounded-full p-3">
                          <div className="bg-indigo-600 rounded-full p-2">
                            <PenTool className="h-6 w-6 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - New addition */}
      <div id="features" className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Everything you need for blogging success
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Powerful tools to create, manage, and grow your blog
            </p>
          </div>

          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div key={index} className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 h-full">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                          {feature.icon}
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{feature.title}</h3>
                      <p className="mt-5 text-base text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>


      {/* CTA Section - More engaging */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to start blogging?</span>
            <span className="block">Create your account today.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-indigo-100">
            Join thousands of content creators who trust our platform for their blogging needs.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-md shadow">
              <Link to='/register'>
              <button className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 transition-colors">
                Get Started Free
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - More comprehensive */}
      <Footer/>
    </div>
  );
}

export default Home;