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
        //bump: u8
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
        //business.bump = bump;
        Ok(())
    }

    pub fn delete_business(_ctx: Context<DeleteBusiness>, name: String) -> Result<()> {
        msg!("Business named {} deleted", name);
        Ok(())
    }
}

//#[account]
//#[derive(InitSpace)]
//pub struct JournalEntryState {
//    pub owner: Pubkey,
//    #[max_len(50)]
//    pub title: String,
//     #[max_len(1000)]
//    pub message: String,
//}

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
    // Store latitude and longitude as fixed-point integers
    pub latitude: i64,
    pub longitude: i64,
    pub created_at: i64,
    //pub bump: u8,
}

//#[account]
//pub struct Review {
//    pub business: Pubkey,
//    pub reviewer: Pubkey,
//    pub rating: u8,
//    pub title: String,
//    pub comment: String,
//    pub created_at: i64,
//    pub bump: u8,
//}

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

//#[derive(Accounts)]
//pub struct CreateReview<'info> {
//    #[account(init, payer = creator, space = 8 + 32 + 32 + 1 + 64 + 256 + 8)]
//    pub review: Account<'info, Review>,
//    #[account(mut)]
//    pub business: Account<'info, Business>,
//    #[account(mut)]
//    pub creator: Signer<'info>,
//    pub system_program: Program<'info, System>,
//}
