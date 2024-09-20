use anchor_lang::prelude::*;

use crate::errors::TrustChainError;
use crate::states::*;

pub fn add_review(
    ctx: Context<CreateReview>,
    title: String,
    rating: u8,
    comment: String,
) -> Result<()> {
    require!(
        title.as_bytes().len() <= TITLE_LENGTH,
        TrustChainError::TitleTooLong
    );

    require!(
        comment.as_bytes().len() <= COMMENT_LENGTH,
        TrustChainError::CommentTooLong
    );

    require!(
        rating >= 1 && rating <= 5,
        TrustChainError::InvalidRating
    );

    let review_entry = &mut ctx.accounts.review_entry;
    review_entry.owner = ctx.accounts.owner.key();
    review_entry.business = ctx.accounts.business.key();
    review_entry.title = title;
    review_entry.rating = rating;
    review_entry.comment = comment;
    review_entry.created_at = Clock::get().unwrap().unix_timestamp;
    Ok(())
}

#[derive(Accounts)]
#[instruction(title: String)]
pub struct CreateReview<'info> {
    #[account(
        init,
        seeds = [title.as_bytes(), owner.key().as_ref()],
        bump,
        payer = owner,
        space = 8 + ReviewEntryState::INIT_SPACE,
    )]
    pub review_entry: Account<'info, ReviewEntryState>,
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(mut)]
    pub business: Account<'info, BusinessEntryState>,
    pub system_program: Program<'info, System>,
}
