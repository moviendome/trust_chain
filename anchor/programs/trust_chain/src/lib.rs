use anchor_lang::prelude::*;

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
        let business_entry = &mut ctx.accounts.business_entry;
        business_entry.owner = ctx.accounts.owner.key();
        business_entry.name = name;
        business_entry.address = address;
        business_entry.profile = profile;
        business_entry.cover = cover;
        business_entry.latitude = latitude;
        business_entry.longitude = longitude;
        business_entry.category = category;
        business_entry.created_at = Clock::get().unwrap().unix_timestamp;
        Ok(())
    }

    pub fn delete_business(_ctx: Context<DeleteBusiness>, name: String) -> Result<()> {
        msg!("Business named {} deleted", name);
        Ok(())
    }

    pub fn create_review(
        ctx: Context<CreateReview>,
        title: String,
        rating: u8,
        comment: String,
    ) -> Result<()> {
        let review_entry = &mut ctx.accounts.review_entry;
        review_entry.owner = ctx.accounts.owner.key();
        review_entry.business = ctx.accounts.business.key();
        review_entry.title = title;
        review_entry.rating = rating;
        review_entry.comment = comment;
        review_entry.created_at = Clock::get().unwrap().unix_timestamp;
        Ok(())
    }
}

#[account]
#[derive(InitSpace)]
pub struct BusinessEntryState {
    pub owner: Pubkey,
    #[max_len(255)]
    pub category: String,
    #[max_len(255)]
    pub name: String,
    #[max_len(255)]
    pub address: String,
    #[max_len(255)]
    pub profile: String,
    #[max_len(255)]
    pub cover: String,
    pub latitude: i64,
    pub longitude: i64,
    pub created_at: i64,
}

#[account]
#[derive(InitSpace)]
pub struct ReviewEntryState {
    pub business: Pubkey,
    pub owner: Pubkey,
    #[max_len(255)]
    pub title: String,
    pub rating: u8,
    #[max_len(255)]
    pub comment: String,
    pub created_at: i64,
}

#[derive(Accounts)]
#[instruction(name: String)]
pub struct CreateBusiness<'info> {
    #[account(
        init,
        seeds = [name.as_bytes(), owner.key().as_ref()],
        bump,
        payer = owner,
        space = 8 + BusinessEntryState::INIT_SPACE,
    )]
    pub business_entry: Account<'info, BusinessEntryState>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(name: String)]
pub struct DeleteBusiness<'info> {
    #[account(
        mut,
        seeds = [name.as_bytes(), owner.key().as_ref()],
        bump,
        close= owner,
    )]
    pub business_entry: Account<'info, BusinessEntryState>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
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
