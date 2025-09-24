import React, { useState, useEffect } from 'react';
import PaperCard from '../components/PaperCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { mockAPI } from '../data/mockData';

const Landing = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredPapers, setFilteredPapers] = useState([]);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    loadPublishedPapers();
  }, []);

  useEffect(() => {
    filterPapers();
  }, [papers, searchTerm, selectedCategory]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const loadPublishedPapers = async () => {
    try {
      setLoading(true);
      const publishedPapers = await mockAPI.getPublishedPapers();
      setPapers(publishedPapers);
    } catch (error) {
      console.error('Error loading papers:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterPapers = () => {
    let filtered = papers;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(paper =>
        paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paper.authors.some(author => 
          author.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        paper.keywords.some(keyword => 
          keyword.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(paper => paper.category === selectedCategory);
    }

    setFilteredPapers(filtered);
  };

  const categories = ['all', ...new Set(papers.map(paper => paper.category))];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading published papers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse animation-delay-4000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
              <span className="text-indigo-300 text-sm font-medium">Trusted by 500+ Researchers Worldwide</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Publish Your Research with
              <span className="block bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Confidence</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 mb-10 leading-relaxed max-w-3xl mx-auto">
              A seamless platform for authors, reviewers, and editors. Transparent workflows. 
              Trusted by researchers worldwide.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#papers"
                className="group bg-white text-slate-900 hover:bg-indigo-50 font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                Browse Papers
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a
                href="/register"
                className="group border-2 border-white text-white hover:bg-white hover:text-slate-900 font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:-translate-y-1"
              >
                Join Our Platform
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section — FIXED: No overlap, clean positioning */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 transition-all duration-300 hover:shadow-xl">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Search Input */}
            <div className="flex-1 relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="M21 21l-4.35-4.35"></path>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search papers by title, authors, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-slate-900 placeholder-slate-400"
                aria-label="Search research papers"
              />
            </div>
            
            {/* Category Filter */}
            <div className="md:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white text-slate-900"
                aria-label="Filter by category"
              >
                <option value="all">All Categories</option>
                {categories.slice(1).map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Papers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">
            Published Research Papers
          </h2>
          <span className="text-slate-600 text-lg font-medium">
            {filteredPapers.length} paper{filteredPapers.length !== 1 ? 's' : ''}
          </span>
        </div>

        {filteredPapers.length === 0 ? (
          <div className="text-center py-20 bg-white/50 rounded-2xl">
            <div className="text-slate-400 text-xl mb-6">
              {searchTerm || selectedCategory !== 'all' 
                ? 'No papers match your search criteria' 
                : 'No published papers available at this time'
              }
            </div>
            {(searchTerm || selectedCategory !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:-translate-y-1"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPapers.map(paper => (
              <PaperCard key={paper.id} paper={paper} />
            ))}
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Why Researchers Choose Build Softech
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We provide a comprehensive solution for academic research publication and peer review
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-slate-200">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-indigo-200 transition-all duration-300">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-indigo-600">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 text-center">
                Rigorous Peer Review
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed text-center">
                Your paper is reviewed by qualified experts assigned by our editorial team for quality and integrity.
              </p>
            </div>

            <div className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-slate-200">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-all duration-300">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-purple-600">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 text-center">
                Fast Turnaround
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed text-center">
                Streamlined workflows ensure your paper moves quickly from submission to publication.
              </p>
            </div>

            <div className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-slate-200">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-all duration-300">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-blue-600">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 text-center">
                Global Visibility
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed text-center">
                Get your research seen by academics and institutions worldwide through our indexed platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-slate-900 hover:bg-slate-800 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl z-50"
          aria-label="Scroll to top"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
    </div>
  );
};

export default Landing;
