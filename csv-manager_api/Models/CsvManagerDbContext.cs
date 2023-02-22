using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace CSV_Manager.Models;

public partial class CsvManagerDbContext : DbContext
{
    public CsvManagerDbContext()
    {
    }

    public CsvManagerDbContext(DbContextOptions<CsvManagerDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Contact> Contacts { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=HOME-PC;Database=CSV_DB;Trusted_Connection=True; Encrypt=False");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Contact>(entity =>
        {
            entity
                .ToTable("csv_table");

            entity.Property(e => e.DateOfBirthday).HasColumnType("date");
            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd()
                .HasColumnName("ID");
            entity.Property(e => e.Name).HasMaxLength(70);
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(13)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
