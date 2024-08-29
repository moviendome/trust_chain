use crate::instructions::*;
use anchor_lang::prelude::*;

pub mod errors;
pub mod instructions;
pub mod states;

declare_id!("F3G1Aa1T1qMjf9EGnBgkJ86t1fzYC2Fg6nWma843YUNe");

#[program]
pub mod trust_chain {
    use super::*;

    pub fn create_business(
        ctx: Context<CreateBusiness>,
        name: String,
        address: String,
        profile: String,
        cover: String,
        latitude: i64,
        longitude: i64,
        category: String,
    ) -> Result<()> {
        add_business(
            ctx, name, address, profile, cover, latitude, longitude, category,
        )
    }

    pub fn delete_business(ctx: Context<DeleteBusiness>, name: String) -> Result<()> {
        remove_business(
          ctx, name
        )
    }

    pub fn create_review(
        ctx: Context<CreateReview>,
        title: String,
        rating: u8,
        comment: String,
    ) -> Result<()> {
        add_review(ctx, title, rating, comment)
    }
}
