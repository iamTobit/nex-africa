import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { InstagramPost } from '../types';
import { Heart, MessageCircle, ExternalLink } from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';

interface InstagramFeedProps {
  nicheSlug: string;
  themeColor: string;
}

export const InstagramFeed: React.FC<InstagramFeedProps> = ({ nicheSlug, themeColor }) => {
  const [handle, setHandle] = useState<string>(`@${nicheSlug}`);
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    api.getInstagramFeed(nicheSlug)
      .then((data) => {
        if (isMounted) {
          setHandle(data.handle);
          setPosts(data.posts);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });
    return () => { isMounted = false; };
  }, [nicheSlug]);

  return (
    <section className="section-padding-sm" style={{ borderTop: '1px solid rgba(17, 17, 17, 0.08)' }}>
      <div className="container">
        {/* Header with Instagram Handle */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '2rem',
            gap: '1rem',
          }}
        >
          <div>
            <span className="label-smallcaps" style={{ color: themeColor, marginBottom: '0.4rem', display: 'flex' }}>
              <InstagramIcon size={14} />
              <span>Live Dispatches</span>
            </span>
            <h3 style={{ fontSize: '1.65rem' }}>Visual Chronicles</h3>
          </div>

          <a
            href={`https://instagram.com/${handle.replace('@', '')}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn-secondary"
            style={{ padding: '0.55rem 1.15rem', fontSize: '0.85rem' }}
          >
            <span>Follow {handle}</span>
            <ExternalLink size={14} />
          </a>
        </div>

        {/* 4-Item Grid */}
        <div className="instagram-grid">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noreferrer"
              className="instagram-card"
            >
              <img src={post.image_url} alt={post.caption} loading="lazy" />
              <div className="instagram-overlay">
                <p
                  style={{
                    fontSize: '0.82rem',
                    color: '#FFFFFF',
                    lineHeight: 1.4,
                    marginBottom: '0.65rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {post.caption}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.78rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Heart size={14} fill="#FFFFFF" /> {post.likes}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <MessageCircle size={14} /> {post.comments}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
