export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      comment: {
        Row: {
          content: string | null
          created_at: string | null
          id: number
          parent_comment: number | null
          posted_by: string | null
          root_post: number | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: number
          parent_comment?: number | null
          posted_by?: string | null
          root_post?: number | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: number
          parent_comment?: number | null
          posted_by?: string | null
          root_post?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "comment_parent_comment_fkey"
            columns: ["parent_comment"]
            referencedRelation: "comment"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_parent_comment_fkey"
            columns: ["parent_comment"]
            referencedRelation: "comment_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_parent_comment_fkey"
            columns: ["parent_comment"]
            referencedRelation: "comment_vote_count"
            referencedColumns: ["comment_id"]
          },
          {
            foreignKeyName: "comment_parent_comment_fkey"
            columns: ["parent_comment"]
            referencedRelation: "comment_with_votes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_posted_by_fkey"
            columns: ["posted_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_root_post_fkey"
            columns: ["root_post"]
            referencedRelation: "post"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_root_post_fkey"
            columns: ["root_post"]
            referencedRelation: "post_community"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_root_post_fkey"
            columns: ["root_post"]
            referencedRelation: "post_preview"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_root_post_fkey"
            columns: ["root_post"]
            referencedRelation: "post_preview_with_votes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_root_post_fkey"
            columns: ["root_post"]
            referencedRelation: "post_vote_count"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "comment_root_post_fkey"
            columns: ["root_post"]
            referencedRelation: "post_with_community_name"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_root_post_fkey"
            columns: ["root_post"]
            referencedRelation: "post_with_votes"
            referencedColumns: ["id"]
          }
        ]
      }
      comment_vote: {
        Row: {
          comment_id: number
          created_at: string | null
          user_id: string
          vote: number | null
        }
        Insert: {
          comment_id: number
          created_at?: string | null
          user_id: string
          vote?: number | null
        }
        Update: {
          comment_id?: number
          created_at?: string | null
          user_id?: string
          vote?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "comment_vote_comment_id_fkey"
            columns: ["comment_id"]
            referencedRelation: "comment"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_vote_comment_id_fkey"
            columns: ["comment_id"]
            referencedRelation: "comment_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_vote_comment_id_fkey"
            columns: ["comment_id"]
            referencedRelation: "comment_vote_count"
            referencedColumns: ["comment_id"]
          },
          {
            foreignKeyName: "comment_vote_comment_id_fkey"
            columns: ["comment_id"]
            referencedRelation: "comment_with_votes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_vote_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      community: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string
          id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      post: {
        Row: {
          content: string | null
          created_at: string | null
          created_by: string | null
          id: number
          posted_in: number | null
          title: string | null
          type: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: number
          posted_in?: number | null
          title?: string | null
          type?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: number
          posted_in?: number | null
          title?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_posted_in_fkey"
            columns: ["posted_in"]
            referencedRelation: "community"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_posted_in_fkey"
            columns: ["posted_in"]
            referencedRelation: "user_subscription"
            referencedColumns: ["community_id"]
          }
        ]
      }
      post_image: {
        Row: {
          caption: string | null
          created_at: string | null
          filename: string
          id: number
          post_id: number | null
          priority: number | null
          url: string
        }
        Insert: {
          caption?: string | null
          created_at?: string | null
          filename: string
          id?: number
          post_id?: number | null
          priority?: number | null
          url: string
        }
        Update: {
          caption?: string | null
          created_at?: string | null
          filename?: string
          id?: number
          post_id?: number | null
          priority?: number | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_image_post_id_fkey"
            columns: ["post_id"]
            referencedRelation: "post"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_image_post_id_fkey"
            columns: ["post_id"]
            referencedRelation: "post_community"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_image_post_id_fkey"
            columns: ["post_id"]
            referencedRelation: "post_preview"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_image_post_id_fkey"
            columns: ["post_id"]
            referencedRelation: "post_preview_with_votes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_image_post_id_fkey"
            columns: ["post_id"]
            referencedRelation: "post_vote_count"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_image_post_id_fkey"
            columns: ["post_id"]
            referencedRelation: "post_with_community_name"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_image_post_id_fkey"
            columns: ["post_id"]
            referencedRelation: "post_with_votes"
            referencedColumns: ["id"]
          }
        ]
      }
      post_vote: {
        Row: {
          post_id: number
          user_id: string
          vote: number
        }
        Insert: {
          post_id: number
          user_id?: string
          vote: number
        }
        Update: {
          post_id?: number
          user_id?: string
          vote?: number
        }
        Relationships: [
          {
            foreignKeyName: "post_vote_post_id_fkey"
            columns: ["post_id"]
            referencedRelation: "post"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_vote_post_id_fkey"
            columns: ["post_id"]
            referencedRelation: "post_community"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_vote_post_id_fkey"
            columns: ["post_id"]
            referencedRelation: "post_preview"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_vote_post_id_fkey"
            columns: ["post_id"]
            referencedRelation: "post_preview_with_votes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_vote_post_id_fkey"
            columns: ["post_id"]
            referencedRelation: "post_vote_count"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_vote_post_id_fkey"
            columns: ["post_id"]
            referencedRelation: "post_with_community_name"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_vote_post_id_fkey"
            columns: ["post_id"]
            referencedRelation: "post_with_votes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_vote_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      public_profile: {
        Row: {
          avatar: string | null
          avatar_filename: string | null
          biography: string
          id: string
          username: string
        }
        Insert: {
          avatar?: string | null
          avatar_filename?: string | null
          biography?: string
          id?: string
          username: string
        }
        Update: {
          avatar?: string | null
          avatar_filename?: string | null
          biography?: string
          id?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_profile_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_community: {
        Row: {
          community_id: number
          user_id: string
        }
        Insert: {
          community_id: number
          user_id?: string
        }
        Update: {
          community_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_community_community_id_fkey"
            columns: ["community_id"]
            referencedRelation: "community"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_community_community_id_fkey"
            columns: ["community_id"]
            referencedRelation: "user_subscription"
            referencedColumns: ["community_id"]
          },
          {
            foreignKeyName: "user_community_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      comment_details: {
        Row: {
          content: string | null
          created_at: string | null
          id: number | null
          parent_comment: number | null
          posted_by: string | null
          posted_by_username: string | null
          posted_in_name: string | null
          root_post: number | null
        }
        Relationships: [
          {
            foreignKeyName: "comment_parent_comment_fkey"
            columns: ["parent_comment"]
            referencedRelation: "comment"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_parent_comment_fkey"
            columns: ["parent_comment"]
            referencedRelation: "comment_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_parent_comment_fkey"
            columns: ["parent_comment"]
            referencedRelation: "comment_vote_count"
            referencedColumns: ["comment_id"]
          },
          {
            foreignKeyName: "comment_parent_comment_fkey"
            columns: ["parent_comment"]
            referencedRelation: "comment_with_votes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_posted_by_fkey"
            columns: ["posted_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_root_post_fkey"
            columns: ["root_post"]
            referencedRelation: "post"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_root_post_fkey"
            columns: ["root_post"]
            referencedRelation: "post_community"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_root_post_fkey"
            columns: ["root_post"]
            referencedRelation: "post_preview"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_root_post_fkey"
            columns: ["root_post"]
            referencedRelation: "post_preview_with_votes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_root_post_fkey"
            columns: ["root_post"]
            referencedRelation: "post_vote_count"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "comment_root_post_fkey"
            columns: ["root_post"]
            referencedRelation: "post_with_community_name"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_root_post_fkey"
            columns: ["root_post"]
            referencedRelation: "post_with_votes"
            referencedColumns: ["id"]
          }
        ]
      }
      comment_vote_count: {
        Row: {
          comment_id: number | null
          total_votes: number | null
        }
        Relationships: []
      }
      comment_with_votes: {
        Row: {
          content: string | null
          created_at: string | null
          id: number | null
          parent_comment: number | null
          posted_by: string | null
          root_post: number | null
          total_votes: number | null
        }
        Relationships: [
          {
            foreignKeyName: "comment_parent_comment_fkey"
            columns: ["parent_comment"]
            referencedRelation: "comment"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_parent_comment_fkey"
            columns: ["parent_comment"]
            referencedRelation: "comment_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_parent_comment_fkey"
            columns: ["parent_comment"]
            referencedRelation: "comment_vote_count"
            referencedColumns: ["comment_id"]
          },
          {
            foreignKeyName: "comment_parent_comment_fkey"
            columns: ["parent_comment"]
            referencedRelation: "comment_with_votes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_posted_by_fkey"
            columns: ["posted_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_root_post_fkey"
            columns: ["root_post"]
            referencedRelation: "post"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_root_post_fkey"
            columns: ["root_post"]
            referencedRelation: "post_community"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_root_post_fkey"
            columns: ["root_post"]
            referencedRelation: "post_preview"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_root_post_fkey"
            columns: ["root_post"]
            referencedRelation: "post_preview_with_votes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_root_post_fkey"
            columns: ["root_post"]
            referencedRelation: "post_vote_count"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "comment_root_post_fkey"
            columns: ["root_post"]
            referencedRelation: "post_with_community_name"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_root_post_fkey"
            columns: ["root_post"]
            referencedRelation: "post_with_votes"
            referencedColumns: ["id"]
          }
        ]
      }
      post_community: {
        Row: {
          content: string | null
          created_at: string | null
          created_by: string | null
          id: number | null
          posted_in: number | null
          posted_in_name: string | null
          title: string | null
          type: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_posted_in_fkey"
            columns: ["posted_in"]
            referencedRelation: "community"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_posted_in_fkey"
            columns: ["posted_in"]
            referencedRelation: "user_subscription"
            referencedColumns: ["community_id"]
          }
        ]
      }
      post_preview: {
        Row: {
          community_name: string | null
          content: string | null
          created_at: string | null
          created_by: string | null
          id: number | null
          post_title: string | null
          posted_in: number | null
          title: string | null
          type: string | null
          username: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_posted_in_fkey"
            columns: ["posted_in"]
            referencedRelation: "community"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_posted_in_fkey"
            columns: ["posted_in"]
            referencedRelation: "user_subscription"
            referencedColumns: ["community_id"]
          }
        ]
      }
      post_preview_with_votes: {
        Row: {
          community_name: string | null
          content: string | null
          created_at: string | null
          created_by: string | null
          id: number | null
          post_title: string | null
          posted_in: number | null
          title: string | null
          total_votes: number | null
          type: string | null
          username: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_posted_in_fkey"
            columns: ["posted_in"]
            referencedRelation: "community"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_posted_in_fkey"
            columns: ["posted_in"]
            referencedRelation: "user_subscription"
            referencedColumns: ["community_id"]
          }
        ]
      }
      post_vote_count: {
        Row: {
          post_id: number | null
          total_votes: number | null
        }
        Relationships: []
      }
      post_with_community_name: {
        Row: {
          community_name: string | null
          content: string | null
          created_at: string | null
          created_by: string | null
          id: number | null
          posted_in: number | null
          title: string | null
          type: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_posted_in_fkey"
            columns: ["posted_in"]
            referencedRelation: "community"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_posted_in_fkey"
            columns: ["posted_in"]
            referencedRelation: "user_subscription"
            referencedColumns: ["community_id"]
          }
        ]
      }
      post_with_votes: {
        Row: {
          content: string | null
          created_at: string | null
          created_by: string | null
          id: number | null
          posted_in: number | null
          title: string | null
          total_votes: number | null
          type: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_posted_in_fkey"
            columns: ["posted_in"]
            referencedRelation: "community"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_posted_in_fkey"
            columns: ["posted_in"]
            referencedRelation: "user_subscription"
            referencedColumns: ["community_id"]
          }
        ]
      }
      user_subscription: {
        Row: {
          community_id: number | null
          created_at: string | null
          description: string | null
          name: string | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_community_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
